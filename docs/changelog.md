# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v0.4.3] - 22.04.2025

## Added

- Support disable show options in Select component

## [v0.4.2] - 14.03.2025

## Fixed

- ScLangText now attempts to get system identifier if main identifier does not exist
- Rename ScnEdge to ScnConnector, struct to structure
- Typos in component names

## [v0.4.1] - 10.03.2025

### Fixed

- eslint warnings

## [v0.4.0] - 12.02.2025

### Changed

- Rename all API classes, methods and objects according to API of ts-sc-client 0.5.0

## [v0.3.3] - 03.02.2025

### Fixed

- Added new props in select - hideSelectedValues

## [v0.3.2] - 24.06.2024

### Fixed

- Correct work of input hover

## [v0.3.1] - 05.06.2024

### Fixed

- Show correct input cursor position when displaying password

## [v0.3.0] - 30.05.2024

### Added

- Hook useFirstMountState

### Changed

- Renamed the `isScrollable` prop to `$isScrollable` in the `StyledTextarea` component

### Fixed

- Prevent `Input` component focus on initial page load
- Centered icons in the `Input` component

## [v0.2.1] - 01.02.2024

### Fixed

- Button colors

## [v0.2.0] - 01.02.2024

### Fixed

- Console errors

### Added

- Theming for Chips, Popup, DropdownOption
- Select mobile version
- IconButton component
- Possibility to change password icon in password input
- Easy popup styling via className

## [v0.1.1] - 13.12.2023

### Fixed

- Passing font weight and color to placeholder

### Added

- Playground for select
- Toasts Animation
- Custom Toast positions
- Tooltip classname

## [v0.0.1] - 29.11.2023

### Added

- Add Select component
- Add Checkbox component

### Changed

- Remove user prop from Decomposition
- Remove inputV2, InputSearch, InputPassword
- Add themeing for button and input
- Add initial Scn Story
- Remove most circular dependences
- Story making components

### Fixed

- Export InputStatus
- Change style of skeleton of SCn

## [v0.0.1-beta.6] - 18.10.2023

### Changed

- Add Input component.
- Add Button component.

## [v0.0.1-beta.4] - 14.09.2023

### Changed

- One of Scn component props has been made optional.

## [v0.0.1-beta.3] - 03.08.2023

### Fixed

- Moved ts-sc-client to externals

## [v0.0.1-beta.2] - 06.07.2023

### Changed

- Typing for addDecompositionItemCallBack, deleteDecompositionItemCallback functions

## [v0.0.1-beta.1] - 04.07.2023

### Added

- Add utility module: findKeynodes
- Add utility module: langToKeynode
- Add utility module: observeRect
- Add utility module: refSetter
- Add utility module: snakeToCamelCase
- Add utility module: getRandomInt
- Add hook: useBooleanState
- Add hook: useClickOutside
- Add hook: useInterval
- Add hook: useInView
- Add component: ButtonWithIcon
- Add component: Chip
- Add component: ClientProvider
- Add component: CommandProvider
- Add component: ContextMenu
- Add component: DecompositionPanel
- Add component: Dropdown
- Add component: DropdownOption
- Add component: Expandable
- Add component: InfiniteScroll
- Add component: Language
- Add component: Popup
- Add component: PositionInPortal
- Add component: Scg
- Add component: Scn
- Add component: ScTag
- Add component: ScTagLink
- Add component: ScUtils
- Add component: Skeleton
- Add component: Spinner
- Add component: SwitchScgScn
- Add component: Textarea
- Add component: Toast
- Add component: Toasts
- Add component: Tooltip
