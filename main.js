{

    const scales = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

    scales.map((scale, index) => {

        $("#beforeScale").append(new Option(scale, index));
        $("#afterScale").append(new Option(scale, index));

    });
    
    $("#before").keyup( onChange );
    $("#before").change( onChange );
    $("#beforeScale").change( onChange );
    $("#afterScale").change( onChange );

    function onChange(e) {

        let tab = $("#before").val();

        let beforeScale = $("#beforeScale").val();
        let afterScale = $("#afterScale").val();

        let newTab = convertScale(tab, beforeScale, afterScale);

        $("#after").html(newTab);
    
    }

    function convertScale(tab, beforeScale, afterScale) {

        let newTab = "";
        let lines = tab.split("\n");

        for (let i = 0; i < lines.length; i++) {

            let line = lines[i].trim();

            if(line != "") {

                let keys = line.split(" ");

                for(let j=0; j < keys.length; j++) {

                    let newKey = convertKey(keys[j], beforeScale, afterScale);
                    newTab += newKey + " ";

                }
            
            }

            newTab += "\n";

        }

        return newTab;

    }

    function convertKey(key, beforeScale, afterScale) {

        let sufix = "";

        if(key[ key.length-1 ] == "°" || key[ key.length-1 ] == "º" || key[ key.length-1 ] == "^") {

            sufix = "°";
            key = key.substr(0, key.length-1);
        
        }

        let currentKey = scales.indexOf(key);
        let newIndex = (currentKey + ( afterScale - beforeScale ) + scales.length) % scales.length;

        return scales[newIndex] + sufix;

    }

}