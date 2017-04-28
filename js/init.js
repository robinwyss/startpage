(function($) {
    $(function() {
        var sectionTemplate = '<div class=\"col s12 m4\"><h5>{title}</h5><ul class="collection"><ul></div>';
        var lisItemTempllate = '<a href="{url}" class="collection-item"><img src="https://www.google.com/s2/favicons?domain={url}" /><span>{name}</span></a>';
        //var sampleSettingsJson = "https://robinwyss.cloudant.com/startpagedemo/55db3d2870c5860664574d157a05b01f"

        // TODO store in separate settings file
        var claudantSettings = {
            uri: "https://robinwyss.cloudant.com/startpage/4b18fb01bdd5f8d4cd38e5d3f225ff00",
            username: "heyetonerantededityallym",
            encryptedApiKey: "U2FsdGVkX1+52WgUMdbpBH5HCFyEsSiXAiPnENXeSR07m4PCaQYworwrSObqL8jZ9R4gi6eh9Vo739q3GiHmwg=="
        }


        function getCloudantApiKey(claudantSettings) {
            if (window.localStorage && window.localStorage["cloudantUser"] && window.localStorage["cloudantUser"] === claudantSettings.username) {
                return window.localStorage["cloudantApiKey"];
            } else {
                var pw = prompt("Enter passoword to decrypt API key");
                var key = CryptoJS.AES.decrypt(claudantSettings.encryptedApiKey, pw).toString(CryptoJS.enc.Utf8);
                if (window.localStorage) {
                    window.localStorage["cloudantUser"] = claudantSettings.username;
                    window.localStorage["cloudantApiKey"] = key;
                    return key;
                }
            }

        }
        // TODO handle authentication failure
        function loadSettings(claudantSettings) {
            var key = getCloudantApiKey(claudantSettings);
            $.ajax(claudantSettings.uri, {crossDomain:true, headers:{'Authorization':'Basic '+ btoa(claudantSettings.username + ":" + key)}}).done(function(data){
                var content = data.content;
                $.each(content.links, function(name, links) {
                    var sectionElement = $(sectionTemplate.replace(/{title}/g, name));

                    $.each(links, function(name, link) {
                        var listItem = lisItemTempllate.replace(/{url}/g, link).replace(/{name}/g, name);
                        sectionElement.find('.collection').append(listItem);
                    });
                    $(".section > .row").append(sectionElement)
                });
            }).error(function(xhr) {
                console.log(xhr)
                localStorage.removeItem("cloudantApiKey");
            });
        }

        loadSettings(claudantSettings);
  }); // end of document ready
})(jQuery); // end of jQuery name space
