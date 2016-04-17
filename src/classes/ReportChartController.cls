public with sharing class ReportChartController {

    @AuraEnabled
    public static Boolean getObjectMatched(String objectId, String objectType) {
        
        Id idToProccess = objectId;              	
        Schema.sObjectType entityType = idToProccess.getSObjectType();
        
        if (entityType.getDescribe().getName() == objectType) {
            return true;
        }
        return false;
    } 
    

     //get URL for Analytics Public REST API
    private static string getAnalyticsURL(){
        string url = System.URL.getSalesforceBaseUrl().getHost() + '/test/services/data/v36.0/analytics/reports/';
        return url;
    }
    
    @AuraEnabled
    public static String getReportMetaData(String reportId){
        
        Map<String, Object> resultMap = new Map<String, Object>();
        List<Object> chartValueList = new List<Object>();
                
        string xmdString = makeRequest(reportId, 'GET');
        System.debug('metadata in apex:'+xmdString);
        Map<String, Object> reportDescribe = (Map<String, Object>)JSON.deserializeUntyped(xmdString);
        Map<String, Object> reportMetadata = (Map<String, Object>)reportDescribe.get('reportMetadata');
        
        List<Object> aggregates = (List<Object>)reportMetadata.get('aggregates');
        List<Object> groupingsDown = (List<Object>)reportMetadata.get('groupingsDown');
        Map<String, Object> chartMetadata = (Map<String, Object>)reportMetadata.get('chart');
        
        String chartType = (String)chartMetadata.get('chartType');
        String title = (String)chartMetadata.get('title');
        List<Object> groupings = (List<Object>)chartMetadata.get('groupings');
        List<Object> summaries = (List<Object>)chartMetadata.get('summaries');
        List<Object> summaryAxisLocations = (List<Object>)chartMetadata.get('summaryAxisLocations');
        
        Integer aggregateIndex = 0;
        Integer groupLevel = 0;
        for (Integer i=0; i<aggregates.size();  i++) {         
    
            if (((String)aggregates.get(i))==((String)summaries.get(0))) {
                aggregateIndex = i;
                break;
            }
        }
        for (Integer i=0; i<groupingsDown.size();  i++) {         
       
            Map<String, Object> groupingsDownObject = (Map<String, Object>)groupingsDown.get(i);
            
            if (((String)groupingsDownObject.get('name'))==((String)groupings.get(0))) {
                groupLevel = i;
                break;
            }
        }
        
        String grouping = (String)groupings.get(0);
        String summary = (String)summaries.get(0);
        
        
        System.debug('aggregates: '+aggregates);
        System.debug('aggregateIndex: '+aggregateIndex);
        System.debug('groupLevel: '+groupLevel);
        System.debug('chartType: '+chartType);
        System.debug('title: '+title);
        System.debug('groupings: '+groupings);
        System.debug('summaries: '+summaries);
        System.debug('summaryAxisLocations: '+summaryAxisLocations);
        
        resultMap.put('chartType',chartType);
        resultMap.put('grouping',grouping);
        resultMap.put('summary',summary);
        resultMap.put('title',title);
        
        Reports.ReportResults results = Reports.ReportManager.runReport(reportId, true);
        Map<String, Reports.ReportFact> factMap = (Map<String, Reports.ReportFact>)results.getFactMap();

        Reports.Dimension dim = results.getGroupingsDown();
        
        retrieveChartValue(factMap,dim.getGroupings(), chartValueList, aggregateIndex, groupLevel, grouping, summary);
        
        
        resultMap.put('chartData', chartValueList);
  
        return JSON.serialize(resultMap);              
    }
    
    //Public API GET Request here 
    private static string makeRequest(string endpoint, string method){
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://' + getAnalyticsURL() + endpoint);
        req.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionId());
        req.setMethod(method);

        System.debug('sessionId' + UserInfo.getSessionId());
        
        HttpResponse res = new HttpResponse();
        Http http = new Http();
        res = http.send(req);
        
        return res.getBody();
    }

    //populate chart data
    private static void retrieveChartValue(Map<String, Reports.ReportFact> factMap, List<Reports.GroupingValue> groups, List<Object> chartValueList, Integer aggregateIndex, Integer groupLevel, String grouping, String summary){

           Map<String, List<Double>> tempGroupValueMap = new  Map<String, List<Double>>();
        
           List<Reports.GroupingValue> tempgroups = retrieveGroups(groups, 0, groupLevel);
        
        
            for (Reports.GroupingValue groupingVal: tempgroups) {

               System.debug('Key: ' + groupingVal.getKey());
               System.debug('Label: ' + groupingVal.getLabel());
               System.debug('Value: ' + groupingVal.getValue());
               System.debug('subgroup: ' + groupingVal);
            
            
            // Construct a fact map key, using the grouping key value
                String factMapKey = groupingVal.getKey() + '!T';
                
                // Get the fact map from the report results
                Reports.ReportFactWithDetails factDetails =
                    (Reports.ReportFactWithDetails)factMap.get(factMapKey);
            
               // System.debug('factDetails: ' + factDetails);
               // // Get the first summary amount from the fact map
                Reports.SummaryValue sumVal = factDetails.getAggregates()[aggregateIndex];
                System.debug('Summary Value: ' + sumVal.getValue());
            
            //    Map<String, String> chartValueMap = new Map<String, String>();
            //    chartValueMap.put(grouping, groupingVal.getLabel());
                
                Double value = ((Decimal)sumVal.getValue()).setScale(2).doubleValue();
          //      chartValueMap.put(summary, String.valueOf(value));
               
                if (tempGroupValueMap.get(groupingVal.getLabel())==null) {
                    
                    List<Double> valueList = new List<Double>();
                    valueList.add(value);
                    tempGroupValueMap.put(groupingVal.getLabel(), valueList);          
                }
                else{
                    
                    tempGroupValueMap.get(groupingVal.getLabel()).add(value);
                    
                }
                
            }
        
        for (String groupLabel: tempGroupValueMap.keySet()) {
            
             if (summary.contains('s!') || summary.contains('RowCount')) {
               chartValueList.add(sumValues(tempGroupValueMap.get(groupLabel), grouping, summary, groupLabel));
             }
             else if (summary.contains('a!')){
               chartValueList.add(avgValues(tempGroupValueMap.get(groupLabel), grouping, summary, groupLabel));
             }
             else if (summary.contains('mx!')) {
               chartValueList.add(maxValues(tempGroupValueMap.get(groupLabel), grouping, summary, groupLabel));                
             }
             else if (summary.contains('m!')) {
               chartValueList.add(minValues(tempGroupValueMap.get(groupLabel), grouping, summary, groupLabel));                
             }
             
        }
 
  
    }
    
    //recursively retrieve the groups in hierachy
    private static List<Reports.GroupingValue>  retrieveGroups(List<Reports.GroupingValue> groups, Integer levelIndex, Integer groupLevel){
        
        List<Reports.GroupingValue> tempGroups = new List<Reports.GroupingValue>();
        
        if (levelIndex==groupLevel) {
            
            tempGroups.addAll(groups);
        }
        else{
        
            for (Reports.GroupingValue tempGroup: groups) {
                
                if (tempGroup.getGroupings()!=null){
                    
                    tempGroups.addAll(retrieveGroups(tempGroup.getGroupings(), ++levelIndex, groupLevel));
                    --levelIndex;
                }
            }
        }
        
        return tempGroups;
   
    }
    
    public static Map<String, String> sumValues(List<Double> groupValueList, String grouping, String summary, String groupLabel) {
 
                
        Double resultValue=0;
        
        for (Double value: groupValueList) {
            
            resultValue = resultValue + value;
        }
        
        return populateValues(grouping, summary, groupLabel, resultValue);
      
    }
    
    private static Map<String, String> avgValues(List<Double> groupValueList, String grouping, String summary, String groupLabel) {

        Double resultValue=0;

        for (Double value: GroupValueList) {
            
            resultValue = resultValue + value;
        }
        
        resultValue = resultValue/groupValueList.size();

        return populateValues(grouping, summary, groupLabel, resultValue);
      
    }
    
    private static Map<String, String> MaxValues(List<Double> groupValueList, String grouping, String summary, String groupLabel) {
  
        Double resultValue=0;

        for (Double value: GroupValueList) {
            
            if (value>resultValue){
                resultValue = value;
            }
        }

        return populateValues(grouping, summary, groupLabel, resultValue);
      
    }
    
    private static Map<String, String> minValues(List<Double> groupValueList, String grouping, String summary, String groupLabel) {
  
        Double resultValue=groupValueList.get(0);

        for (Double value: groupValueList) {
           
            if (resultValue>value){
                resultValue = value;
            }
        }

        return populateValues(grouping, summary, groupLabel, resultValue);
      
    }
    
    private static Map<String, String> populateValues(String grouping, String summary, String groupLabel, Double value) {
        
        Map<String, String> chartValueMap = new Map<String, String>();
        chartValueMap.put(grouping, groupLabel);

        chartValueMap.put(summary, String.valueOf(value));
        
        return chartValueMap;
        
    }
    
    
}