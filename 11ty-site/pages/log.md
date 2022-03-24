---
title: Log
prism: true
---

<!-- prettier-ignore-start -->
{% if global.env == 'dev' %}
<style>body{background: #191c1b;}pre[class*=language-]{box-shadow: none;}</style>


```js
{{ collections.all | pageLog }}
```






{% else %}
<div class="container">There is no content on this page.</div>
{% endif %}
<!-- prettier-ignore-end -->
