# Example ServiceStack.Markdown

## Showing @examples.Count items

@foreach (var item in examples) {
  - @item.Name: @item.Number 
}


**Note: The template requires a space after the item.Number value**

For more information, check out 
[the docs](http://www.servicestack.net/docs/markdown/markdown-razor).

Also, *don't forget* to check out the code at 
[gh:ServiceStack/ServiceStack](https://github.com/ServiceStack/ServiceStack)

Here are some _other_ attempts to **break** 
the markdown **generation_of_html**. **escaped\_underscore\_in\_tags**

A space after double-asterisk (&lt;strong&gt; tags) will ** break **