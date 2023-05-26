# naming

## css

In case of css modules (prefered) lets partly use BEM. In this case we do not need block, vut elements and modificators are quite usefull. We will use camelCase naming confection: `elemName_modName_modVal`. Also No-namespace style is ok to use.
https://ru.bem.info/methodology/naming-convention/

For ordinary css it is not a big deal.

Name of pictures when importing:

- For icons `[Name]Icon` (CloseIson, ArrowIcon);
- For images `[Name]Image` (WaveImage).

## js

js variables, object properties should only be named in camelCase.

## assets

use dash separated words, like `my-icon.png`. All letters should be lovercased.

# css

To add css one may use 2 ways

1. Create an ordinary `scss` file and import it like this:

```tsx
import './my-css.scss';

const Comp = () => {
  return null;
};
```

2. Create a `*.m.scss` file to use css-modules (prefered):

```tsx
import styles from './my-css.m.scss';

const Comp = () => {
  return <div className={styles.myClass}></div>;
};
```

This way you may safely use short class names like `.btn`, `.item` or whatever you want, because your classname after build will be transformed to unique one. Read more on css-modules: https://github.com/css-modules/css-modules

Try to avoid using id selectors and !important. The best variant is a simple class without nesting.

# Architecture

In our architecture page is a central entity. All components, hooks, icons that are required for the particular page should be nested there. Reusable components, hooks, constants, etc. is placed in src. So folder structure may look like this.

```
src
--components
--hooks
--constants
--pages
--Login
----components
----constants
----hooks
--Main
----components
----constants
----hooks
```

Icons also placed in the component they are required in. If icon is requred by many components move it to assets folder

## Location of pictures, utilities, etc.

If it is small and looks readable, then we put it on the same level with the component.
If more than 1, unreadable, then create folders: icons, utils, hooks, etc.

## Component nesting

If a component has several other components and they will be used only in it, then we create a `components` folder inside the component and put everything there.
We divide into large blocks.
If the component is reusable, then put it in the root.

# imports

Do not use relative imports. Insted use absolute ones. The are listed in webpack/alias.js.

Bad:

```tsx
import A from '../../some-path.tsx';
```

Good:

```tsx
import A from '@components/some-comp.tsx';
import B from './here.tsx';
```

```scss
@import '~@assets/some-icon.png';
```

# Recipes

## Variables

- if the variable holds a boolean value: `is<Variable name>` - `isChecked`

## TypeScript

Props:

If component return JSX

```tsx
interface IProps {
  prop1: type;
}

const MyComp: FC<IProps> ({prop1}) => {
  return (
    <>
    </>
  )
}
```

Variables:

When a boolean value is passed, if the prop is not standard `isProp`, if the prop is standard `<Prop name>`.

Exemple: custom props - `isOpen`; standard props - `disabled`.

Import images:

```tsx
import { ReactComponent as Image } from '@assets/image.svg';

const MyComp = () => {
  return (
    <>
      <Image />
    </>
  );
};
```

## Import images

To import an image to react:

```tsx
import image from '@assets/image.png';

const MyComp = () => {
  return (
    <>
      <img src={image} />
    </>
  );
};
```

To import an image to css:

```scss
.my-class {
  background-image: url('./image.png');
}

.my-another-class {
  background-image: url('~@assets/another-image.svg');
}
```

# Testing

The tester must test.
The front must deal with front-line tasks.

If there is absolutely nothing, then it is possible, but it is better to do your tasks.
If you have been assigned for review, then you can, but it is better to review the code and logic.
