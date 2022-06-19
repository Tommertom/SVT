
/* Instasite form support Version 1.3 */

$(document).ready(function() {

    $(".instasite-form").each(function() {

        var form = $(this);

        form.find(".alert-submit-success").removeClass("hidden").slideUp(0);
        form.find(".alert-captcha-incorrect").removeClass("hidden").slideUp(0);

        form.find(".data-field").datepicker({todayHighlight: true});

        form.find(".action-refresh-captcha").on("click", function(event) {
           event.preventDefault();
           var date = new Date();
           form.find(".captcha-image").attr("src", "/form/generate-captcha?t=" + date.getTime())
        });

        form.on("submit", function(event) {

            event.preventDefault();

            form.find(".alert-captcha-incorrect").slideUp();
            form.find(".control-group").removeClass("error");

            var missing_input = false;

            form.find("input, textarea").each(function() {

                var input = $(this);

                if(! input.attr("data-required")) {
                    return;
                }

                if(input.attr("type") == "checkbox") {
                    if(! input.is(":checked")) {
                        input.closest(".control-group").addClass("error");
                        missing_input = true;
                    }
                }

                if(input.val() == "") {
                    input.closest(".control-group").addClass("error");
                    missing_input = true;
                }

            });

            if(missing_input) {

                if(form.find(".control-group.error:first")) {

                    var error_group = form.find(".control-group.error:first");

                    $('html, body').animate({
                        scrollTop: error_group.offset().top - 20
                    }, 300);
                }

                return false;
            }

            form.find(".busy-icon").removeClass("hidden").show()

            $.ajax({
                method: "post",
                url: form.find("form").attr("action"),
                data: form.find("form").serialize(),
                success: function(data) {
                    form.find(".alert-submit-success").slideDown();
                    form.find(".form").slideUp();
                    form.children("input").val("");
                    form.children("textarea").val("");
                    form.find(".busy-icon").hide()
                },
                error: function(jqXHR, textStatus, errorThrown) {

                    form.find(".busy-icon").hide()

                    if(jqXHR.responseText == "captcha_incorrect") {
                        form.find(".alert-captcha-incorrect").slideDown()
                        form.find("[name='captcha']").closest(".control-group").addClass("error");
                        return;
                    }

                    alert("Sorry: unable to save form, please contact us!")
                }
            });
            return false;
        });

    });

});

