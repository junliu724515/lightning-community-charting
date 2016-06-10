({
		
    pieChart : function(data, donutChart, chartNo){

        var config = {
              "type": "pie",
              "dataProvider": data,
              "valueField": "value",
              "titleField": "summary",
               "labelText": "",
               "labelRadius": 1,
               "radius": "42%",  
               "legend":{
                   "position":"bottom",
                   "align": "center"
                   
               },
               "balloon":{
               "fixedPosition":true
              },
              "export": {
                "enabled": true
              }
            }
        
        if (donutChart){
            
            config.innerRadius="60%";
        }
        
        var chart = AmCharts.makeChart( "chartdiv"+chartNo, config);
        
    },
    
    barChart : function(data, isHorizontal, lineColor, chartNo){
        
         var config = {
          "type": "serial",
          "dataProvider": data,
          "rotate":isHorizontal,
          "valueAxes": [{
            "axisAlpha": 0,
            "position": "left",
            "title": ""
          }],
          "startDuration": 1,
          "graphs": [{
            "balloonText": "<b>[[category]]: [[value]]</b>",
            "fillAlphas": 0.9,
            "lineAlpha": 0.2,
            "type": "column",
            "valueField": "value",
            "lineColor": lineColor
          }],
          "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
          },
          "categoryField": "summary",
          "categoryAxis": {
            "gridPosition": "start",
            "labelRotation": 90
          },
          "export": {
            "enabled": true
          }
        
        };
        
       /*      
        if (lineColor!==undefined || lineColor!='') {
            
            var graphs = config.graphs;           
            graphs[0].lineColor = lineColor,
        }
*/
         //Bar chat
          var chart = AmCharts.makeChart("chartdiv"+chartNo, config); 
        
        
    },
    
    lineChart : function(data, lineColor, chartNo){
        
         //Bar chat
          var chart = AmCharts.makeChart("chartdiv"+chartNo, {
          "type": "serial",
          "theme": "light",
          "dataProvider": data,
          "valueAxes": [{
            "axisAlpha": 0,
            "position": "left",
            "title": ""
          }],
          "startDuration": 1,
          "graphs": [{
            "balloonText": "<b>[[category]]: [[value]]</b>",
            "fillAlphas": 0,
            "lineAlpha": 0.2,
            "type": "line",
            "bullet" : "round",
            "lineColor" : lineColor,
            "valueField": "value"
          }],
          "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
          },
          "categoryField": "summary",
          "categoryAxis": {
            "gridPosition": "start",
            "labelRotation": 90
          },
          "export": {
            "enabled": true
          }
        
        });
     },
    
    funnelChart: function(data, chartNo){
        
        var chart = AmCharts.makeChart( "chartdiv"+chartNo, {
          "type": "funnel",
          "theme": "light",
          "dataProvider": data,
          "titleField": "summary",
         
          "legend":{
              "position":"right",
              "align": "center"
              
          },
          "labelText":"",
          "labelPosition": "center",
          "funnelAlpha": 0.9,
          "valueField": "value",
          "startX": 0,
          "neckWidth": "40%",
          "startAlpha": 0,
          "outlineThickness": 1,
          "neckHeight": "30%",
          "balloonText": "[[title]]:<b>[[value]]</b>",
          "export": {
            "enabled": true
          }
        } );
      
        
    },

    
    scatter: function (data, chartNo) {
        
        var chart = new AmCharts.AmXYChart();
        chart.dataProvider = data;
        chart.theme="light";
        
        var graph = new AmCharts.AmGraph();
        graph.bullet = "diamond";
        graph.valueField  = "value0";
        graph.xField = "x0";
        graph.yField = "y0";
        graph.lineAlpha = 0;
        graph.lineColor = "#2574A9",
        chart.addGraph(graph);
        
        chart.write('chartdiv'+chartNo);
    },
    
    scatterGrouped: function (data,chartNo) {
        
        var chart = new AmCharts.AmXYChart();
        chart.dataProvider = data;
        chart.theme="light";
        
        var graph = new AmCharts.AmGraph();
        graph.bullet = "diamond";
        graph.valueField  = "value0";
        graph.xField = "x0";
        graph.yField = "y0";
        graph.lineAlpha = 0;
        graph.lineColor = "#2574A9",
        chart.addGraph(graph);
        
        var graph1 = new AmCharts.AmGraph();
        graph1.bullet = "circle";
        graph1.valueField  = "value1";
        graph1.xField = "x1";
        graph1.yField = "y1";
        graph1.lineAlpha = 0;
       // graph1.lineColor = "#2574A9",
        chart.addGraph(graph1);
        
        chart.write('chartdiv'+chartNo);
    }
    
    
    
})