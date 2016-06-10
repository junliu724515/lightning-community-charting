({
	createChart : function(component, event, helper) {
		
        var data = [];
        
        var xValue;
        var yValue;
        var charttype;

        
        var chartTheme = component.get("v.chartTheme");
        var chartBackgroundColor = component.get("v.chartBackgroundColor");
        var chartTitle = component.get("v.chartTitle");
        var reportId = component.get("v.chartReportId");
        var barColumnColor = component.get("v.barColumnColor");
        var chartNo = component.get("v.chartNumber");

        if (chartTheme=="light") {
          AmCharts.theme = AmCharts.themes.light; 
        }
        else if (chartTheme=="dark") {  
            AmCharts.theme = AmCharts.themes.dark;
            if (chartBackgroundColor===undefined || chartBackgroundColor==''){
                component.set("v.chartBackgroundColor","#3F3F4F");
            }
        }
        else if (chartTheme=="patterns") {
            AmCharts.theme = AmCharts.themes.patterns;  
        }
        
        
        
        var action = component.get("c.getReportMetaData");
        action.setParams({"reportId":reportId,
                          "sitePrefix":component.get("v.sitePrefix")});
        action.setCallback(this, function(response) {
                var state = response.getState();
                
                if (state === "SUCCESS") {
               /**/   console.log('data: ' + response.getReturnValue());
                    var resultData = JSON.parse(response.getReturnValue());
                    
               /**/     console.log('chartType: ' + resultData.chartType);
                    
                    data = resultData.chartData;
                    xValue = resultData.grouping;
                    yValue = resultData.summary;
                    charttype = resultData.chartType;
                    
                /**/    console.log('charttype: '+charttype);
                /**/    console.log('charttitle: '+resultData.title);
                /**/     debugger;
                    if (chartTitle===undefined || chartTitle=='') {
                      component.set("v.chartTitle", resultData.title);
                    }
                    
                    if (charttype=="Donut") {
                       helper.pieChart(data, true, chartNo);
                    }
                    else if (charttype =="Pie") {
                       helper.pieChart(data, false, chartNo);
                    }
                    else if (~charttype.indexOf("Vertical Bar")) {
                       helper.barChart(data, false, barColumnColor,chartNo);     
                    }
                    else if (~charttype.indexOf("Horizontal Bar")) {
                       helper.barChart(data, true, barColumnColor,chartNo);     
                    }
                    else if (~charttype.indexOf("Line")) {
                       helper.lineChart(data, barColumnColor,chartNo);     
                    }
                    else if (charttype=="Funnel"){
                       helper.funnelChart(data,chartNo);      
                    }
                    else if (charttype=="Scatter") {
                       helper.scatter(data,chartNo);
                    }
                    else if (charttype=="Scatter Grouped") {
                       helper.scatterGrouped(data,chartNo);    
                    }
                   
                    
                    
                }
        });
        $A.enqueueAction(action);
  
	}
})