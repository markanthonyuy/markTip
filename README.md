markTip
=======

A very simple jquery tooltip plugin.

3 Steps Guide
-------------
1. Include jquery.js and ```html <script src="marktip.js"></script>```
2. Set options using data attribute `data-marktip-position`
3. Initialize markTip `$('.marktip').markTip()`

Options
-------
You can set options in two different ways

``` html <span class="marktip" data-marktip-title="Hello!" data-marktip-position="top">Hover me</span> ```

or

~~~ js
$('.marktip').markTip({ 
  position: 'bottom'
});
~~~
Changelog
---------
* **version .0.1.0**
	- initial feature
