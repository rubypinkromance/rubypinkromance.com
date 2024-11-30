---
title: Styleguide
slug: styleguide
permalink: styleguide/
date: 2024-02-05
prism: true
---

<div class="t-light">

## Light Theme

Lorem ipsum dolor sit amet, [test link](http://example.com) adipiscing elit. **This is strong.** Nullam dignissim convallis est. Quisque aliquam. _This is emphasized._ Donec faucibus. **this is _strongly emphasized._** Nunc iaculis suscipit dui.

</div>

<div class="t-dark">

## Dark Theme

Lorem ipsum dolor sit amet, [test link](http://example.com) adipiscing elit. **This is strong.** Nullam dignissim convallis est. Quisque aliquam. _This is emphasized._ Donec faucibus. **this is _strongly emphasized._** Nunc iaculis suscipit dui.

</div>

## Body Copy

Lorem ipsum dolor sit amet, [test link](http://example.com) adipiscing elit. **This is strong.** Nullam dignissim convallis est. Quisque aliquam. _This is emphasized._ Donec faucibus. **this is _strongly emphasized._** Nunc iaculis suscipit dui. 5<sup>3</sup> = 125. Water is H<sub>2</sub>O. Nam sit amet sem. Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl. <cite>The New York Times</cite> (That's a citation). <u>Underline.</u> Maecenas ornare tortor. Donec sed tellus eget sapien fringilla nonummy. Mauris a ante. Suspendisse quam sem, consequat at, commodo vitae, feugiat in, nunc. Morbi imperdiet augue quis tellus.

<abbr title='Hyper Text Markup Language'>HTML</abbr> and <abbr title='Cascading Style Sheets'>CSS</abbr> are our tools. Mauris a ante. Suspendisse quam sem, consequat at, commodo vitae, feugiat in, nunc. Morbi imperdiet augue quis tellus. Praesent mattis, massa quis luctus fermentum, turpis mi volutpat justo, eu volutpat enim diam eget metus. To copy a file type <code>COPY <var>filename</var></code> and press <kbd>return</kbd>. <del>Dinner's at 5:00.</del> <ins>Let's make that 7.</ins> This <s>text</s> has been struck. This <mark>text</mark> has been marked.

<small>This footnote is made with the `small` element.</small>

---

## Headings

# H1: The **arsonist** has _oddly shaped_ feet

## H2: The **human torch** was _denied_ a bank loan

### H3: **60%** of the time, it works _every time_

#### H4: Jackdaws love my big sphinx of quartz

##### H5: The five boxing wizards jump quickly

###### H6: The quick brown fox jumps over the lazy dog

---

## List Types

### Definition List

<dl>
  <dt>Definition List Title</dt>
  <dd>This is a definition.</dd>
  <dd>This is an alternate definition.</dd>
  <dt>Definition</dt>
  <dd>
    An exact statement or description of the nature, scope, or meaning of something:
    <em>our definition of what constitutes poetry</em>.
  </dd>
</dl>

### Ordered List

1. List Item 1
1. List Item 2
   1. Nested List Item A
   1. Nested List Item B
1. List Item 3

### Unordered List

- List Item 1
- List Item 2
  - Nested List Item A
  - Nested List Item B
- List Item 3

---

## Tables

<table>
  <thead>
  <tr>
    <th>&nbsp;</th>
    <th>Enterprise</th>
    <th>Enterprise D</th>
    <th>Galactica</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <th>Captain</th>
    <td>James Kirk</td>
    <td>Jean-Luc Picard</td>
    <td>William Adama</td>
  </tr>
  <tr>
    <th>XO</th>
    <td>Spock</td>
    <td>William Riker</td>
    <td>Saul Tigh</td>
  </tr>
  <tr>
    <th>Doctor</th>
    <td>Leonard McCoy</td>
    <td>Beverly Crusher</td>
    <td>Doc Cottle</td>
  </tr>
  <tr>
    <th>Engineer</th>
    <td>Montgomery Scott</td>
    <td>Geordi LaForge</td>
    <td>Galen Tyrol</td>
  </tr>
  </tbody>
</table>

---

## Asides

<aside>

**Note:** The `<aside>` HTML element represents a portion of a document whose content is only indirectly related to the document's main content. Asides are frequently presented as sidebars or call-out boxes.

</aside>

---

## Preformatted Text

Including, but not limited to code. Typographically, preformatted text is not the same thing as code. Sometimes, a faithful execution of the text requires preformatted text that may not have anything to do with code. For example:

<pre>
“Beware the Jabberwock, my son!
    The jaws that bite, the claws that catch!
Beware the Jubjub bird, and shun
    The frumious Bandersnatch!”
</pre>

<pre>
! " # $ % & ' ( ) * + , - . /
0 1 2 3 4 5 6 7 8 9 : ; < = > ?
@ A B C D E F G H I J K L M N O
P Q R S T U V W X Y Z [ \ ] ^ _
` a b c d e f g h i j k l m n o
p q r s t u v w x y z { | } ~
</pre>

---

### Code

Code can be presented inline, like `<?php bloginfo('stylesheet_url'); ?>`, or within a `pre` block.

```
.container {
  float: left;
  margin: 0 -240px 0 0;
  width: 100%;
}
```

You can also get syntax highlighting by adding `class="language-XXXX"` to your `code` element, like so:

<figure>

```html
<pre>
  <code class="language-css">
    p {
      color: red
    }
  </code>
</pre>
```

<figcaption>HTML formatting</figcaption>
</figure>
<figure>

```css
pre[class*='language-']::selection,
code[class*='language-']::selection {
  text-shadow: none;
  background: #b3d4fc;
}

@media print {
  code[class*='language-'],
  pre[class*='language-'] {
    text-shadow: none;
  }
}
```

<figcaption>CSS formatting</figcaption>
</figure>
<figure>

```javascript
for (let i = 1; i <= 100; i++) {
  if (i % (3 * 5) === 0) {
    console.log('FizzBuzz');
  } else if (i % 3 === 0) {
    console.log('Fizz');
  } else if (i % 5 === 0) {
    console.log('Buzz');
  } else {
    console.log(i);
  }
}
```

<figcaption>JavaScript formatting</figcaption>
</figure>

And many more!

---

## Figures

Figures are usually used to refer to images:

<figure>
  <img alt="" loading="lazy" width="1600" height="900" src="../_assets/_images/social/control-social.jpg">
  <figcaption>
    <h4>Figure Heading</h4>
    <p>This is a placeholder image, with supporting caption.</p>
  </figcaption>
</figure>

Here, a part of a poem is marked up using figure:

<figure>
  <p>
    ‘Twas brillig, and the slithy toves<br />
    Did gyre and gimble in the wabe;<br />
    All mimsy were the borogoves,<br />
    And the mome raths outgrabe.
  </p>
  <figcaption>
    <cite>Jabberwocky</cite> (first verse). Lewis Carroll, 1832-98
  </figcaption>
</figure>

---

## Blockquotes

Let's keep it simple. Be sure to style the citation.

<blockquote>
  <p>
    People think focus means saying yes to the thing you’ve got to focus on. But
    that’s not what it means at all. It means saying no to the hundred other
    good ideas that there are. You have to pick carefully. I’m actually as proud
    of the things we haven’t done as the things I have done. Innovation is
    saying no to 1,000 things.
  </p>
  <footer>
    Steve Jobs, <cite>Apple Worldwide Developers’ Conference</cite>, 1997
  </footer>
</blockquote>

And here's a bit of trailing text.
