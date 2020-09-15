

        function populatechart(parent, labelsdata, dataset, title){
            linecolor = 'rgb(148,0,211)';
            bgcolor = 'rgb(255, 255, 255)';
            if(title == 'PSK'){
                linecolor = 'rgb(148,0,0)';
                bgcolor = 'rgb(148,0,0)';
            }
            Chart.defaults.line.spanGaps = true;
            var chart = new Chart(parent, {
                // The type of chart we want to create
                type: 'line',
                // The data for our dataset
                data: {
                    labels: labelsdata,
                    datasets: [{
                        label: "Line Chart for "+title,
                        backgroundColor: bgcolor,
                        borderColor: linecolor,
                        data: dataset,
                        steppedLine: true,
                    }],
                }, 
                options: {
                    responsive: true,
                    tooltips: {
                        mode: 'point',
                    },  
                    legend: {
                        display: false,
                    },
                }
            },{
                scaleOverride: true, 
                scaleStepWidth: 1, 
                scaleSteps: 1
            });
        }
    
        function mlt3mod(lbldata){
        var prev_state=0
        var cur_state=parseInt(lbldata[0])
        var res_str=[]
        res_str.push(cur_state)
        for(i=1;i<lbldata.length;i++){
            if(lbldata[i]=='1'){
                if (cur_state==0 && prev_state==1){
                    res_str.push(-1)
                    prev_state=cur_state
                    cur_state=1
                }
                else if (cur_state==0 && prev_state==-1){
                    res_str.push(1)
                    prev_state=cur_state
                    cur_state=1
                }
                else if (cur_state==1 && prev_state==0){
                 
                res_str.push(0)
                prev_state=cur_state
                cur_state=0   
                }
            }
            if(lbldata[i]=='0'){
                res_str.push(cur_state)
            }
        }
        return res_str
    }

    function pseudoternarymod(bin_str){
    var cur_state=-1
    var res_str=[]
    res_str.push(0)
    for(i=1;i<bin_str.length;i++){
        if (bin_str[i]=='0'){
            if (cur_state==-1){
                res_str.push(1);
                cur_state=1;
            }
            else{
                res_str.push(-1);
                cur_state=-1;
            }
        }
        if (bin_str[i]=='1'){
            res_str.push(0);
        }
        }
    return res_str
}
  
        function amimod(bin_str)
       {
        var cur_state=parseInt(bin_str[0]);
        var res_str=[];
        res_str.push(cur_state);
        for(i=1;i<bin_str.length;i++)
            if (bin_str[i]=='1'){
                if (cur_state==-1){
                    res_str.push(1);
                    cur_state=1;
                }
                else{
                    res_str.push(-1);
                    cur_state=-1;
                }
                }
            else{
                
                res_str.push(0);
            }
             
        return res_str;
       }
        function onclickbtn(){
            document.getElementById("outpt").style.display = "block";
            var imp = document.getElementById('bindata').value;
            lbldata = Array.from(imp);
        
        var mltparent = document.getElementById('mlt3').getContext('2d');
         points = mlt3mod(imp);
        populatechart(mltparent, lbldata, points, "MLT3");
        /**AMI PLOT**/
        var amiparent = document.getElementById('ami').getContext('2d');
         pts = amimod(imp);
        populatechart(amiparent, lbldata, pts, "AMI");
        /**PSEUDOTERNARY PLOT**/
        var pseudoparent = document.getElementById('pseudoternary').getContext('2d');
        points = pseudoternarymod(imp);
        populatechart(pseudoparent, lbldata, points, "Pseudoternary");
        /**CRC PLOT**/
        var crcparent = document.getElementById('psk').getContext('2d');
        pts = []
        for (index = 0; index < lbldata.length; index++) { 
            if(lbldata[index] == "0"){
                pts.push("-1");
            }
            else{
                pts.push("1");
            }
        } 
        
        populatechart(crcparent, lbldata, pts, "PSK");
    }

  