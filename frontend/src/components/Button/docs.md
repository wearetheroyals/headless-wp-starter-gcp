---
name: Button
type: component-documentation
contentfulLink: /content_types/button/fields
---

Flexible buttons that reside within components, or as a standalone block.

### Available Fields

#### `linkReference` (Text)

An internal or external link reference, when you click the button, navigation will occur to this page

- Internal links: don't include `http(s)`, and contain the _path only_. eg. `/blog/some-new-post`
- External links: include `http(s)`, and navigate away from this site to a new external location. eg. `https://stackoverflow.com`

#### `style` (Text)

A string that will be added to the `class` field of the Button element

For example, setting `style` to `fit small special` will render the following element.

```html
<button class="button fit small special">
  ...
</button>
```

This allows for multiple combinations and flexibility to create custom classes that can be applied in the CMS.

#### `innerHtml` (Markdown/HTML)

Flexibly define the content rendered inside the button, could potentially include icons, images or other rich content.
