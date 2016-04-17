({
	donutChart : function(data, xValue, yValue) {
		
        //donut
        var chart = AmCharts.makeChart( "chartdiv", {
          "type": "pie",
          "theme": "light",
          "dataProvider": data,
          "titleField": xValue,
          "valueField": yValue,
          "labelRadius": 1,
          "legend":{
              "position":"bottom",
              "align": "center"
              
          },
          "radius": "42%",
          "innerRadius": "60%",
          "labelText": "",
          "valueAxes": {
                "unit": "$",
                "unitPosition": "left",
               
            }, 
          "export": {
            "enabled": true
          }
        } );
        
	},
    
    pieChart : function(data, xValue, yValue){
        
        debugger;
        var chart = AmCharts.makeChart( "chartdiv", {
              "type": "pie",
              "theme": "light",
              "dataProvider": data,
              "valueField": yValue,
              "titleField": xValue,
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
            } );
        
    },
    
    barChart : function(data, xValue, yValue){
        
         //Bar chat
          var chart = AmCharts.makeChart("chartdiv", {
          "type": "serial",
          "theme": "light",
          "marginRight": 70,
          "dataProvider": data,
          "valueAxes": [{
            "axisAlpha": 0,
            "position": "left",
            "title": ""
          }],
          "startDuration": 1,
          "graphs": [{
            "balloonText": "<b>[[category]]: [[value]]</b>",
          //  "fillColorsField": "color",
            "fillAlphas": 0.9,
            "lineAlpha": 0.2,
            "type": "column",
            "valueField": yValue
          }],
          "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
          },
          "categoryField": xValue,
          "categoryAxis": {
            "gridPosition": "start",
            "labelRotation": 20
          },
          "export": {
            "enabled": true
          }
        
        }); 
        
        
    },
    
    lineChart : function(data, xValue, yValue){
        
         //Bar chat
          var chart = AmCharts.makeChart("chartdiv", {
          "type": "serial",
          "theme": "light",
         // "marginRight": 70,
          "dataProvider": data,
          "valueAxes": [{
            "axisAlpha": 0,
            "position": "left",
            "title": ""
          }],
          "startDuration": 1,
          "graphs": [{
            "balloonText": "<b>[[category]]: [[value]]</b>",
          //  "fillColorsField": "color",
            "fillAlphas": 0,
            "lineAlpha": 0.2,
            "type": "line",
            "bullet" : "round",
            "lineColor" : "#2574A9",
            "valueField": yValue
          }],
          "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
          },
          "categoryField": xValue,
          "categoryAxis": {
            "gridPosition": "start",
            "labelRotation": 90
          },
          "export": {
            "enabled": true
          }
        
        });
     },
    
    funnelChart: function(data, xValue, yValue){
        
        var chart = AmCharts.makeChart( "chartdiv", {
          "type": "funnel",
          "theme": "light",
          "dataProvider": data,
          "titleField": xValue,
         
          "legend":{
              "position":"right",
              "align": "center"
              
          },
          "labelText":"",
          "labelPosition": "center",
          "funnelAlpha": 0.9,
          "valueField": yValue,
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
    
    scatterChart: function(){
        
      var chart = AmCharts.makeChart("chartdiv", {
            "type": "xy",
            "theme": "light",
            "autoMarginOffset": 20,
            "dataProvider": [{
                "ax": 1,
                "ay": 1,
                "bx": 1,
                "by": 1
            }, {
                "ax": 2,
                "ay": 2,
                "bx": 2,
                "by": 2
            }, {
                "ax": 9,
                "ay": 9,
                "bx": 9,
                "by": 9
            }],
            "valueAxes": [{
                "position": "bottom",
                "axisAlpha": 0,
                "dashLength": 1,
                "title": "X Axis"
            }, {
                "axisAlpha": 0,
                "dashLength": 1,
                "position": "left",
                "title": "Y Axis"
            }],
            "startDuration": 1,
            "graphs": [{
                "balloonText": "x:[[x]] y:[[y]]",
                "bullet": "triangleUp",
                "lineAlpha": 0,
                "xField": "ax",
                "yField": "ay",
                "lineColor": "#FF6600",
                "fillAlphas": 0
            }, {
                "balloonText": "x:[[x]] y:[[y]]",
                "bullet": "triangleDown",
                "lineAlpha": 0,
                "xField": "bx",
                "yField": "by",
                "lineColor": "#FCD202",
                "fillAlphas": 0
            }],
            "trendLines": [{
                "finalValue": 11,
                "finalXValue": 12,
                "initialValue": 2,
                "initialXValue": 1,
                "lineColor": "#FF6600"
            }, {
                "finalValue": 19,
                "finalXValue": 12,
                "initialValue": 1,
                "initialXValue": 1,
                "lineColor": "#FCD202"
            }],
            "marginLeft": 64,
            "marginBottom": 60,
            "chartScrollbar": {},
            "chartCursor": {},
            "export": {
                "enabled": true,
                "position": "bottom-right"
            }
        });  
        
    },
    
    horizontalBarGrouped: function(data, xValue, yValue){
        
      var chart = AmCharts.makeChart("chartdiv", {
            "type": "serial",
             "theme": "light",
            "categoryField": xValue,
            "rotate": true,
            "startDuration": 1,
            "categoryAxis": {
                "gridPosition": "start",
                "position": "left"
            },
            "trendLines": [],
            "graphs": [
                {
                    "balloonText": "[[value]]",
                    "fillAlphas": 0.8,
                    "id": "AmGraph-1",
                    "lineAlpha": 0.2,
                    "title": "Income",
                    "type": "column",
                    "valueField": yValue
                },    
            ],
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    "position": "top",
                    "axisAlpha": 0
                }
            ],
            "allLabels": [],
            "balloon": {},
            "titles": [],
            "dataProvider": data,
            "export": {
                "enabled": true
             }
        
        });  
    },
    
    verticalBar: function(data, xValue, yValue) {
        
        var chart = new AmCharts.AmSerialChart();
        chart.dataProvider = data;
        chart.categoryField = xValue;
        chart.theme="light";
       // chart.rotate="true";
        
        var categoryAxis = chart.categoryAxis;
        categoryAxis.gridPosition = "start";
        categoryAxis.labelRotation = 90;
        
        var legend = new AmCharts.AmLegend();
        legend.position="bottom";
        legend.align="center";
        chart.addLegend(legend); 
        
        var graph = new AmCharts.AmGraph();
        graph.valueField = yValue;
      //  graph.title= yValue;
        graph.type = "column";
        graph.fillAlphas = 0.8;
        graph.lineAlpha = 0.3;
        graph.lineColor = "#2574A9",
        chart.addGraph(graph);

        chart.write('chartdiv');
        
        
    }
})