window.onload = function () {
    $("#track").click(function () {
        // doFindFeatures();
        doStuff();
        $('.results, #canvas, #redo').css({
            display: 'block'
        })
        $('#img, #track, #fate, #uploadnew').css({
              display: 'none'
        }) 

        $('.upload-title h1').text('RICE RICE BABY');
    })

    $("#redo").click(function() {
          document.location.href = "/";
          console.log('home')
    })

    $("#go, #uploadnew").click(function () {
        document.location.href = "/uploadpic";
    })

    $(".tiff").click(function () {
       location.href = 'http://www.tiffanysun.io'
    })

    $(".edu").click(function () {
        location.href = 'http://linkedin.com/in/eportet'
    })

    $(".bryan").click(function () {
        location.href = 'http://bryan-sim.com'
    })

    $(".jess").click(function () {
        location.href = 'http://linkedin.com/in/jessicalin58'
    })




     let height = 400;
     let width = 400;
     let img = document.getElementById("img");
     var doStuff = function () {
         let orig = cv.imread(img);
         let image = cv.imread(img);
         cv.cvtColor(image, image, cv.COLOR_RGBA2GRAY);
         cv.GaussianBlur(image, image, {
             height: 11,
             width: 11
         }, 0, 0, cv.BORDER_DEFAULT);
         cv.threshold(image, image, 165, 255, cv.THRESH_BINARY);
         let contours = new cv.MatVector();
         const hierarchy = new cv.Mat();
         cv.findContours(image, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE, new cv.Point());
         hierarchy.delete();
         let color = [255, 0, 0, 255];
         // cv.drawContours(image, contours, -1, color, 2);
         let rice_area = 0;
         var areas = [];
         for (let i = 0; i < contours.size(); i++) {
             let cnt = contours.get(i);
             rice_area += cv.contourArea(cnt, false);
             let rect = cv.boundingRect(contours.get(i));
             let area = cv.contourArea(contours.get(i), false);
             if (area < 2) {
                 continue;
             }
             let x = rect.x + rect.width / 2;
             let y = rect.y + rect.height / 2;
             areas.push({
                 x,
                 y,
                 area
             });
         }
         // console.log(rice_area);
         var grain_count =  Math.floor(rice_area * 0.015) + " rice grains, with 100% confidence. [0%] margin of error.";
         for (let i = 0; i < areas.length; i++) {
             let x1 = areas[i].x;
             let y1 = areas[i].y;
             let prev_distance = 9999;
             let closest = [-1, -1];
             for (let j = i + 1; j < areas.length; j++) {
                 let x2 = areas[j].x;
                 let y2 = areas[j].y;
                 let new_dist = Math.floor(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
                 if (new_dist < prev_distance && new_dist < 50) {
                     prev_distance = new_dist;
                     closest = [x2, y2];
                 }
             }
             if (closest[0] != -1 && closest[1] != -1) {
                 let p1 = new cv.Point(x1, y1);
                 let p2 = new cv.Point(closest[0], closest[1]);
                 cv.line(orig, p1, p2, color);
             }
         }
         // for (let i = 0; i < areas.length; i++) {
         //   const { x, y, area } = areas[i];
         //   let size = 0;
         //   cv.circle(orig, { x, y }, size, [255, 0, 0, 255], -1);
         // }
         Math.seedrandom(areas.length);
         var type = ["Glutinous", "Sticky", "Arborio", "Basmati", "Jasmine", "Instant"]
         var grain = ["Long", "Short", "Medium"]
         var text = [
             "Everything is going to be all rice.",
             "No pain, no grain.", "It’s nice to be important, but it’s more important to be rice.",
             "If at first you don’t succeed, try, try a-grain.",
             "If you want true greatness, you have to pay the full rice for it.",
             "Complacency will be the grain of your existence.",
             "Don’t be afraid to get bruised, rice it off and carry on.",
             "You might fail, but the experience will be riceless.",
             "No rice is too high to pay for the privilege of owning yourself.",
             "The rice of greatness is responsibility.",
             "Every action has its pleasures and its rice.",
             "Insanity is doing the same thing, over and over a-grain, but expecting different results.",
             "Nothing ventured, nothing grained.",
             "Don’t grain the world and lose your soul.",
             "There are two tragedies in life. One is to lose your heart's desire. The other is to grain it."
         ]

        $('.output').html('Your rice of the day is ' + type[Math.floor(Math.random() * type.length)] +
            " and your grain is " + grain[Math.floor(Math.random() * grain.length)] + ". " +
            text[Math.floor(Math.random() * text.length)] + '<br>' + '<br>' + grain_count);
        
        cv.imshow("canvas", orig);
        image.delete();
        orig.delete();
     }
     }
     var canvas = document.getElementById('canvas');

     function onOpenCvReady() {
         console.log("Ready!");

}



