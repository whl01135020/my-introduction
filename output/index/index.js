var wrapper = new Vue({
    el: "#wrapper",
    data: {
        currentPage:1
    },
    methods: {
        menuClick(index){
            this.currentPage = index;
            if(index==4){
                this.loadChart();
            }
        },
        loadChart(){
            echarts.dispose($('#echart')[0]);
            let barChartIdInstance = echarts.init($('#echart')[0]);
            let topData = [90,90,85,95,95,93];
            let topXa = ['javaScript','jquery','vue','echarts','html5','css3'];
            let option = {
                title: {
                    text: '我的技能',
                    left:'center'
                },
                color: ["#38B5FA", "#FFB750", "#99DC3D"],
                tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    textStyle: {
                    color: '#5aa5fa'
                    },
                    lineStyle: {
                    opacity: 0.2
                    }
                },
                extraCssText: 'box-shadow: 0 0 4px rgba(0, 0, 0, 0.12);',
                textStyle: {
                    color: '#333',
                    fontWeight: 'bold'
                },
                borderWidth: 1,
                borderColor: '#ddd',
                padding: 16,
                backgroundColor: 'rgba(255, 255, 255, .95)'
                },
                legend: {
                data: ['技能掌握情况'],
                y: 'bottom'
                },
                grid: {
                top: "40",
                left: '0',
                right: '30',
                bottom: '40',
                containLabel: true
                },
                xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
                },
                yAxis: {
                type: 'category',
                data: topXa
                },
                series: [{
                name: '技能掌握情况',
                type: 'bar',
                barWidth: '18px',
                itemStyle: {
                    normal: {
                    color: '#17b8f1',
                    label: {
                        show: false,
                        position: 'right',
                        formatter: function(a) {
                        return a.value;
                        },
                        textStyle: {
                        color: "#000",
                        fontSize: 14
                        }
                    }
                    },
                    emphasis: {
                    color: '#17b8f1'
                    }
                },
                data: topData
                }]
            }
            topXa.reverse(), topData.reverse();
            barChartIdInstance.setOption(option);
        }
    },
    mounted: function () {
    }
})