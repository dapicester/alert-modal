/*
 * Implements a user-facing modal alert using Bootstrap's modals.
 * MIT licence.
 *
 * Paolo D'Apice <dapicester@gmail.com>
 *
 * Heavily inspired from ifad/data-confirm-modal
 */

(function($) {

    /**
     * Builds the markup for a Bootstrap modal.
     */

    var defaults = {
        title: 'Alert',
        text: '',
        dismiss: 'OK',
        dismissClass: 'btn-default',
        fade: true,
        zIndex: 1050,
        modalClass: false,
        show: true,
    };

    var settings;

    window.alertModal = {
        setDefaults: function(newSettings) {
            settings = $.extend(settings, newSettings);
        },

        restoreDefaults: function() {
            settings = $.extend({}, defaults);
        },

        alert: function(options) {
            var modal = buildModal(options);

            modal.spawn();
            modal.on('hidden.bs.modal', function() {
                modal.remove();
            });

            modal.find('.dismiss').on('click', function() {
                modal.modal('hide');
            });
        }
    };

    alertModal.restoreDefaults();

    var buildModal = function(options) {
        var id = 'alert-modal-' + String(Math.random()).slice(2, -1);
        var fade = settings.fade ? 'fade' : '';
        var modalClass = options.modalClass ? options.modalClass : settings.modalClass;

        var modal = $(
            '<div id="'+id+'" class="modal '+modalClass+' '+fade+'" tabindex="-1" role="dialog" aria-labelledby="'+id+'Label" aria-hidden="true">' +
                '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                            '<h4 id="'+id+'Label" class="modal-title"></h4> ' +
                        '</div>' +
                        '<div class="modal-body"></div>' +
                        '<div class="modal-footer">' +
                            '<button class="btn dismiss" data-dismiss="modal" aria-hidden="true"></button>' +
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'
        );

        // Make sure it's always the top zindex
        var highest = current = settings.zIndex;
        $('.modal.in').not('#'+id).each(function() {
            current = parseInt($(this).css('z-index'), 10);
            if(current > highest) {
                highest = current
            }
        });
        modal.css('z-index', parseInt(highest) + 1);

        modal.find('.modal-title').text(options.title || settings.title);

        var body = modal.find('.modal-body');

        $.each((options.text || '').split(/\n{2}/), function (i, piece) {
            body.append($('<p/>').html(piece));
        });

        var dismiss = modal.find('.dismiss');
        dismiss.text(options.dismiss || settings.dismiss);
        dismiss.addClass(options.dismissClass || settings.dismissClass);

        modal.on('shown.bs.modal', function() {
            modal.find('.dismiss').focus();
        });

        $('body').append(modal);

        modal.spawn = function() {
            return modal.modal({
                backdrop: options.backdrop,
                keyboard: options.keyboard,
                show:     options.show
            });
        };

        return modal;
    };

    $.alertModal = function(options) {
        var modal = alertModal.alert(options);
        return modal;
    };
})(jQuery);
