# Alert Modal

Uses [Bootstrap's modals](http://getbootstrap.com/javascript/#modals)
to be used instead of the browser's builting `alert()` API.

Heavily inspired from [data-confirm-modal](https://github.com/ifad/data-confirm-modal).

## Installation

Using Bower, add this to your `bower.json` dependencies

```json
"dependencies": {
    ...
    "alert-modal": "dapicester/alert-modal",
    ...
}
```

## Usage

Call it either directly:

```javascript
alertModal.alert({text: 'This is an alert'});
```

or with jQuery:

```javascript
$.alertModal({text: 'This is an alert'});
```

You can set global settings using `alertModal.setDefaults`, for example:

```javascript
alertModal.setDefaults({
    title: 'Error',
    dismiss: 'I got this'
});
```

To restore default settings use `alertModal.restoreDefaults()`.

## Modal options

The default [bootstrap modal options](http://getbootstrap.com/javascript/#modals-options)
can be passed via JavaScript:

```javascript
$.alertModal({text: 'This is an alert', backdrop: 'static', keyboard: false});
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git pusn origin my-new-feature`)
5. Create new Pull Request
