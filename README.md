markTip
=======

A very simple jquery tooltip plugin.

5 Steps Guide
-------------
1. Include jquery.js and ```<script src="marktip.js"></script>```
2. add marktip class ```<span class="marktip">Hover me<span>```
3. add tooltip text ```data-marktip-title="Hello"```
4. Set options using data attribute ```data-marktip-position="top"```
5. Initialize markTip `$('.marktip').markTip()`

Options
-------
You can set options in two different ways

```<span class="marktip" data-marktip-title="Hello!" data-marktip-position="top">Hover me</span> ```

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
