console.log("This is plot.js");

function DrawBarchart(sampleId) {

    // console.log(`DrawBarchart(${sampleId})`);

//draw bar chart
    d3.json("samples.json").then(data => {
   
//test code
        // console.log(data);  

        let samples = data.samples;  


//filter
        let resultArray = samples.filter(s => s.id === sampleId);
        let result = resultArray[0];

        //test it: filter statement is workings
                // console.log(result);


        let otu_ids = result.otu_ids;  
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        //test it

        // console.log(otu_ids);
        // console.log(otu_labels);
        // console.log(sample_values);

    
    
        //Barchart

        let yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`).reverse();

        let barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10),
            orientation: "h"
        };

        let barArray = [barData];

        Plotly.newPlot("bar", barArray);
        

        //Bubble Chart

        var LayoutBubble = {
            margin: { t: 0 },
            xaxis: { title: "OTU ID" },
            hovermode: "closest",
            };
        
            var DataBubble = [ 
            {
              x: otu_ids,
              y: sample_values,
              text: otu_labels,
              mode: "markers",
              marker: {
                color: otu_ids,
                size: sample_values,
                }
            }
          ];
        
          Plotly.newPlot("bubble", DataBubble, LayoutBubble);
    });
    
    
}


function DrawBubblechart (sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);
}

function ShowMetadata(sampleId) {
    console.log(`ShowMetadata(${sampleId})`);
}

// create the function to get the necessary data
function getDemoInfo(id) {

    // Read the json file to get data
    d3.json("samples.json").then((data)=> {

        // get the metadata info for the demographic panel
        var metadata = data.metadata;

        console.log(metadata)

      // Filter meta data info by id
       var result = metadata.filter(meta => meta.id.toString() === id)[0];

      // Select demographic panel 
       var demographicInfo = d3.select("#sample-metadata");
        
     // Empty the demographic info 
       demographicInfo.html("");


       console.log(Object.entries(result));

     // Demographic data  & append the info to the panel :key value pairing : key1 = value
        Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

//DROP DOWN FOR DEMOGRAPHICS

//call the option change (Coded in html)
function optionChanged(id) {
    console.log(`optionChanged(${id})`);

    

    
    
    //display barchart, bubblchart and demographic data
    DrawBarchart(id);
    DrawBubblechart(id);
    ShowMetadata(id);
    getDemoInfo(id);

}



function InitDashboard()
{
    console.log("Initializing Dashboard");

    let selector = d3.select("#selDataset");

//use D3 for dropdown instead of html

    d3.json("samples.json").then(data => {
        // console.log(data);

        

        let sampleNames = data.names;

        sampleNames.forEach(sampleId => {
                selector.append("option")
                     .text(sampleId)
                     .property("value", sampleId);

                     
                     
        });


        
        let sampleId = sampleNames[0];

            DrawBarchart(sampleId);
            DrawBubblechart(sampleId);
            ShowMetadata(sampleId);
            getDemoInfo(sampleId);


            
            });
        
            
    }

InitDashboard();