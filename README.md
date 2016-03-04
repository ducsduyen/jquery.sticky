# jquery.sticky
jQuery Sticky Plugin
======================
Sticky is a jQuery plugin that gives you the ability to make any element on your page always stay visible.

Usage
=======================
```html
<script src="jquery.js"></script>
<script src="jquery.sticky.js"></script>
<script>
  $(document).ready(function(){
    $("#sticker").sticky({topSpacing:0,bottomSpacing:0});
  });
</script>
```

Options
==========
- topSpacing: Pixels between the page top and the element's top. Default value 0.
- bottomSpacing: Pixels between the page bottom and the element's bottom. Default value 0.

Events
==========
- sticky-start: When the element becomes sticky.
- sticky-end: When the element returns to its original location.
- sticky-bottom-reached: When the element reached the bottom space limit.
- sticky-bottom-unreached: When the element unreached the bottom space limit.

To subscribe to events use jquery:

```html
<script>
  $('#sticker').on('sticky-start', function() { console.log("Started"); });
  $('#sticker').on('sticky-end', function() { console.log("Ended"); }); 
  $('#sticker').on('sticky-bottom-reached', function() { console.log("Bottom reached"); });
  $('#sticker').on('sticky-bottom-unreached', function() { console.log("Bottom unreached"); });
</script>
```
