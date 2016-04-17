({
	createChart : function(component, event, helper) {
		
        var data = [];
        
        var xValue;
        var yValue;
        var charttype;
        
       // var title="Record Count";
        
        
       var action = component.get("c.getReportMetaData");
        action.setParams({"reportId":"00O28000005ZPK5"});
        action.setCallback(this, function(response) {
                var state = response.getState();
                
                if (state === "SUCCESS") {
                    console.log('data: ' + response.getReturnValue());
                    var resultData = JSON.parse(response.getReturnValue());
                    console.log('chartType: ' + resultData.chartType);
                    data = resultData.chartData;
                    xValue = resultData.grouping;
                    yValue = resultData.summary;
                    charttype = resultData.chartType;
                    
                    console.log('charttype: '+charttype);
                    console.log('charttitle: '+resultData.title);
                     debugger;
                    component.set("v.chartTitle", resultData.title);
                    if (charttype=="Donut") {
                       helper.donutChart(data, xValue, yValue);
                    }
                    else if (charttype =="Pie") {
                       helper.pieChart(data, xValue, yValue);
                    }
                    else if (charttype=="Vertical Bar") {
                       helper.verticalBar(data, xValue, yValue);     
                    }
                    else if (charttype=="Line") {
                       helper.lineChart(data, xValue, yValue);     
                    }
                    else if (charttype=="Funnel"){
                       helper.funnelChart(data, xValue, yValue);      
                    }
                    else {
                       helper.horizontalBarGrouped(data, xValue, yValue);       
                    }
                    
                    
                }
        });
        $A.enqueueAction(action);
  
	}
})