/**
 * Created by livia on 2018/1/16.
 */

import 'pace/pace.js'
import 'font-awesome/css/font-awesome.min.css'

// import '/imports/ui/lib/nifty/css/demo/nifty-demo.min.css'
// import '/imports/ui/lib/nifty/js/demo/nifty-demo.min'

$(document).on('nifty.ready', function () {
// SUMMERNOTE
  $('#demo-summernote, #demo-summernote-full-width').summernote({
    height : '500px'
  });
});