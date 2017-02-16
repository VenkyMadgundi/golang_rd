$(document).ready(function(){

    // Create Program or Ad-Hoc Event from sponsorships dashboard and Event view all page.
  $("#dummyButton").click(function() {
        var val = $('input:radio[name=select_event_type]:checked').val();
        var sponsorship_id=$(this).data("id");
        var url = '';
        if (val== "Ad-Hoc Event"){
            url += "/events/new?ad_hoc=true&sponsorship_id="+sponsorship_id;
        }else{
          url = '/sponsorships/'+sponsorship_id+'/events/new';
        }
        window.location.href = url;
  });

  $("#new-sponsor-event, #close_update_button").click(function(){
    $("#event_details_hidden").toggle(200);
    return false;
  });
  // Create Program or Ad-Hoc Event from sponsorships dashboard and Event view all page.

    (function($){
        $.fn.outside = function(ename, cb){
          return this.each(function(){
           var $this = $(this),
           self = this;
           $(document.body).bind(ename, function tempo(e){
             if(e.target !== self && !$.contains(self, e.target)){
              cb.apply(self, [e]);
              if(!self.parentNode) $(document.body).unbind(ename, tempo);
            }
          });
         });
        };
      }(jQuery));

    // Generic solution for Start Date and End Date, Jquery Date picker form.
    $("#startDate, #endDate,[class*=date-picker]").attr( 'readOnly' , 'true' );
    //$(".select").chosen({allow_single_deselect: true, no_results_text: 'No results matched'});

    //Slide Menu for Mobile//
    $(function(){
    var menuStatus;
    //$('.nav').hide();
    $("a.shownav").click(function(){
        if(menuStatus != true){
          $(".wrapper,.header,.footer").animate({marginRight: "-70px"}, 300, function(){menuStatus = true});
          //$('.nav').show();
          $('.nav').animate({ left: '-14' }, 300);

          return false;
          } else {
         $(".wrapper,.header,.footer").animate({marginRight: "1px"}, 300, function(){menuStatus = false});
          //$('.nav').hide();
          $('.nav').animate({ left: '-86' }, 300);
          return false;
          }
    });
    });

    var wd = $(window).width();
    //if (navigator.userAgent.match(/iphone|ipod|mobileexplorer|android|zune|ipad|android 3.0|xoom|sch-i800|gt-p1000|playbook|tablet|kindle|honeycomb|nexus 7/)) {
    if (navigator.userAgent.match(/(iPod|iPhone|iPad|android)/) || wd<640) {
    //if(wd<640) {  
      $(".ddMenu").click(function(){
        $(".ddMenu").not(this).find(".ddMenuList").slideUp(500);
        $(this).find(".ddMenuList").slideToggle(500);
      });
    }

   /* $(document).on("click", "#reset_filter", function(){
      window.location.href = window.location.href.split("?")[0];
    });*/

    $('.short_tooltip, .account_deactivate, .short_markets, .short_brands').tooltip({
      delay: 0,
      showURL: false,
      bodyHandler: function() {
      rel_id = $(this).attr("rel");
      return $("#" + rel_id).html();
      }
    }); 
    
    $('.mp_header').tooltip({
      delay: 0,
      showURL: false,
      bodyHandler: function() {
          return "Menu Placement";
      }
    });

    $('.wst_header').tooltip({
      delay: 0,
      showURL: false,
      bodyHandler: function() {
          return "Brand Advocacy";
      }
    });

    // Numeric only control handler
    jQuery.fn.ForceNumericOnly =
    function()
    {
        return this.each(function()
        {
            $(this).keydown(function(e)
            {
                var code = e.which || e.keyCode ; 

                if ( !( e.shiftKey == false &&
                        (
                           code == 9 ||
                           code == 46 ||
                           code == 8 ||
                           code == 37 ||
                           code == 39 ||
                           ( code >= 48 && code <= 57 ) ||
                           (code >= 96 && code <= 105)
                        )
                     )
                ){

                     e.preventDefault();                   
                }                
            });
        });
    };  

    jQuery.ajaxSetup({
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Accept", "text/javascript");
          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
        }
    });

    /*$( document ).ajaxComplete(function( event,request, settings ) {
      $(".select").chosen({allow_single_deselect: true, no_results_text: 'No results matched'}); 
    });*/
    
    $(".picker").datetimepicker({
        ampm: true,
        stepMinute: 15,
        timeFormat: 'hh:mm tt',
        showOn: "both",
        buttonImage: "/assets/icon-spendDate.gif", 
        buttonImageOnly: true,
        showOtherMonths: true,
        selectOtherMonths: false,
        minDate: (new Date(((new Date().getFullYear()) - 2), 11, 1))
    });
    
    $("#programMarketsDetailsID").children("#goal_goalable_id").each(function() {
        $(this).change(function(){
            $.get("/program_markets_details", {
                program_id: $(this).val()
            });
        });
    });

    $(".date-picker").datepicker({
        showOn: "both",
        buttonImage: "/assets/icon-spendDate.gif", 
        buttonImageOnly: true,
        showOtherMonths: true,
        selectOtherMonths: false,
        minDate: (new Date(((new Date().getFullYear()) - 2), 11, 1))
    });

    $("#notice.flash").fadeToggle(3000, "linear");

    $("#photo_upload").bind("click", function() {
        var rand = Math.random().toString().split(".")[1];
        var input = '<input type="file" class="'+rand+'" />'
        $(this).before('<br/>' + input );
    });

    $("#photo_upload").trigger("click");

    $('.reports_tooltip').tooltip({
        delay: 0,
        showURL: false,
        bodyHandler: function() {
            return $(this).closest("td").find(".multiple_markets").html();
        }
    });

    $("#report_spinner1")
    .bind("ajaxSend", function(){
        $(this).show();
    })
    .bind("ajaxComplete", function(){
        $(this).hide();
    });

    $("#report_spinner2")
    .bind("ajaxSend", function(){
        $(this).show();
    })
    .bind("ajaxComplete", function(){
        $(this).hide();
    });

    $('.report_selection_options').live('click', function() {
        $(".report_selection_partials").hide('slow');
        $("#partial_"+$(this).attr("value")).toggle('slow');
    })

    $('.user_activity_market_selector').live('change', function() {
        $.post("/reports/user_activity_options_changed", {
            market_id: $(this).val(),
            activity_for: $(this).attr("activity_for")
        })
    })

    $('.user_activity_user_selector').live('change', function() {
        $.post("/reports/user_activity_options_changed", {
            user_id: $(this).val(),
            market_id: $("#market_id").val(),
            activity_for: $(this).attr("activity_for")
        })
    })
    
    $('#search_brand_id').live('change', function(e) {
        var checkedValues=[];
        var search_brand_id=$('#search_brand_id');
        setTimeout(function(){
        for (var i=0; i < $('#search_brand_id:checked').length; i++){
           if($('#search_brand_id:checked')[i].checked==true && $('#search_brand_id:checked')[i].value !="on"){
                checkedValues.push($('#search_brand_id:checked')[i].value);
           }
        }
        if(search_brand_id.attr("activity_for").length > 0 && search_brand_id.attr("activity_for") == "depletion_brand_id_search"){
            $.post("/marques/depletion_brand_changed", {
                brand_id: checkedValues,
                activity_for: search_brand_id.attr("activity_for")
            })
        }else{
         $.post("/marques/depletion_brand_changed", {
            brand_id: $(this).val()
         })
        }
        },300);
    });

    $('.market_wts_link').live('click', function() {
        var text = $("#"+$(this).attr("wts_link_id")+"_span").text();
        $("#"+$(this).attr("wts_link_id")+"_span").text(
            text == "+" ? "-" : "+");

        $("#"+$(this).attr("wts_link_id")).toggle('slow');
        return false;
    });

    $('.account_reports_link').live('click', function() {
        var text = $("#"+$(this).attr("account_reports_id")+"_span").text();
        $("#"+$(this).attr("account_reports_id")+"_span").text(
            text == "+" ? "-" : "+");

        $("#"+$(this).attr("account_reports_id")).toggle('slow');
        return false;
    });

    $('.program_goals_link').live('click', function() {
        var text = $("#"+$(this).attr("program_goals_link_id")+"_span").text();
        $("#"+$(this).attr("program_goals_link_id")+"_span").text(
            text == "+" ? "-" : "+");

        $("#"+$(this).attr("program_goals_link_id")).toggle('slow');
        return false;
    });

    $('.market_gva_link').live('click', function() {
        var text = $("#"+$(this).attr("gva_link_id")+"_span").text();
        $("#"+$(this).attr("gva_link_id")+"_span").text(
            text == "+" ? "-" : "+");

        $("#"+$(this).attr("gva_link_id")).toggle('slow');
        return false;
    })

    $('.market_mp_link').live('click', function() {
        var text = $("#"+$(this).attr("mp_link_id")+"_span").text();
        $("#"+$(this).attr("mp_link_id")+"_span").text(
            text == "+" ? "-" : "+");

        $("#"+$(this).attr("mp_link_id")).toggle();
        return false;
    })

    // toggle groups - swiped from stephan.com legacy branch
    $('.toggle_group .toggle').live('change', function() {
        $(this).closest('.toggle_group').find(".child_toggle").attr('checked',this.checked)
    })
    $('.toggle_group .child_toggle').live('change', function() {
        if(!this.checked) $(this).closest('.toggle_group').find(".toggle").attr('checked',false)
    })

    $('.child_toggles ').live('change', function() {
        if(!this.checked){
            $("#"+$(this).attr("parent_id")).attr('checked',false);
        }
    })


    $('.checkall').checkgroup({
        groupSelector:'.groupclass',
        enabledOnly:true
    });

    $('.account_toogle_brand').live("click",function(){
        $.post('/accounts/toggle_brand', {
            brand_id: this.value,
            checked: this.checked,
            account_id: $(this).attr("account_id")
        });
    });

    $('#resetForm').live("click",function(){
      $("#dr_distribution_list_name").val("");
      $('[class^="useclass"]').val('');
      $('[class^="useclass"]').next("div").find("span").remove();
      $('[class^="extclass"]').val('');
      $("#dynamic_reports_market_ids").val("");
      $("#dynamic_reports_market_ids").trigger('chosen:updated');
      $("#dynamic_reports_brand_ids").val("");
      $("#dynamic_reports_comments").val("");
      $("#events").attr("checked", false);
      $("#market_visits").attr("checked", false);
      $("#wait_staff_training").attr("checked", false);
      $("#menu_placement").attr("checked", false);
      $("#events_favorite_photos").attr("checked", false);
      $("#tactical_spend").attr("checked", false);
      $("#update_dataID").attr("checked", false);
      $("#dynamic_reports_market_ids").next("div").find("ul li.search-choice").remove().trigger('chosen:updated');
      $("#dynamic_reports_brand_ids").next("div").find("ul li.search-choice").remove();
      $("#dynamic_reports_distribution_lists_").val('').trigger('chosen:updated');
      $("#new_distribution_list_form").hide();
      $("#errorExplanation").remove("div");
      $("#new_dr_distribution_list").find(".field_with_errors").removeClass( "field_with_errors");
      if($(".custom_success_msg").length > 0){
        $(".custom_success_msg").hide();
      }
      return false;
    });

    // Add AJAX callback for checkboxes to toggle Brands
    $('#accounts_brand_ids_select_all').change(function(cb) {
        var brands_account_id = 0;
        var brand_ids = [];
        $('.groupclass').each(function() {
            brands_account_id = $(this).attr("account_id");
            brand_ids.push(this.value);
        });
        $.post("/accounts/toggle_brand", {brand_id: brand_ids, checked: this.checked, account_id: brands_account_id });
    });    

    $('a.form-submit').click(function(){
        $(this).closest('form').submit()
    })

    $('a.pro-deactivate').click(function(){
        $(this).closest('form').submit()
    });
    $('a.pro-activate').click(function(){
        $(this).closest('form').submit()
    });

    $('a.pro-no-fav').click(function(){
        $(this).closest('form').submit()
    });
    $('a.pro-favorite').click(function(){
        $(this).closest('form').submit()
    });

    // Make header column sort links AJAX if data attributes exist
    ReadyHeaderLinks();

    // Search bar stuff
    $("#saved_filter_url").change(function(){
        // alert($(this).val().substr(1,3)); // TODO clean this up
        if($(this).val().substr(1,3) == 'uov'){
            var strLoc = 'events?';
            strLoc = strLoc + $(this).val();
            window.location =  strLoc;
        }
        else {
            $('form#search_filter div.search_wrapper').find('input#search').val($(this).val());
            $('form#search_filter').submit();
        }
    });
    $("#save_search_link").click(function(){
        $("#save_search_form").show();
        return false;
    });



    // PDF Link for report filters...submits form with PDF indicated
    $(function(){
        $("#report_filter_pdf_link").click(function(){
            var form = $("#new_report_search_params");
            var originalUrl = form.attr("action");

            form.attr("action", originalUrl + ".pdf");
            form.attr("target", "_blank");
            $("#new_report_search_params").submit();
            form.attr("action", originalUrl); //leave things as we found them
            form.attr("target", "");

            return false;
        });
    });


    $(function(){
        $("#report_search_params_brand_id").change(function(){
            $.post("/reports/brand_changed", {
                brand_id: $(this).val()
            })
        });
    });


    $(function(){
        $(".market_account_activity_filters").change(function(){
            $.post("/reports/market_account_activity_filters_changed", {
                brand_id: $("input[name='report_search_params[brand_id][]']:checked").map(function () {return this.value;}).get().join(","),
                market_id: $("#accounts_market_activity_market_id").val()
            })
        });
    });

    // Link for scheduling reports with filters...
    $(function(){
        $("#schedule_report_link").click(function(){
            var form = $("#new_report_search_params");
            var originalUrl = form.attr("action");

            form.attr("action", "/reports/schedule_reports_for_mail");
            form.attr("target", "");
            $("#new_report_search_params").submit();
            form.attr("action", originalUrl); //leave things as we found them
            form.attr("target", "");

            return false;
        });
    });


    // CSV Link for report filters...submits form with PDF indicated
    $(function(){
        $(".report_export_link").click(function(){
            var form = $("#new_report_search_params");
            var originalUrl = form.attr("action");
            var format = ""
            switch($(this).attr("data-format")){
                case "xlsx":
                    format = ".xlsx";
                    break;
                case "xls":
                    format = ".xls";
                    break;
                case "pdf":
                    format = ".pdf";
                    break;
                default:
                    format = ".csv";
                    break;
            }
            form.attr("action", originalUrl + format);
            form.attr("target", "_blank");
            $("#new_report_search_params").submit();
            form.attr("action", originalUrl); //leave things as we found them
            form.attr("target", "");

            return false;
        });
    });

    // CSV Link for report filters...submits form with PDF indicated
    $(function(){
        $("#report_filter_csv_link_1").click(function(){
            var form = $("#new_report_search_params_1");
            var originalUrl = form.attr("action");

            form.attr("action", originalUrl + ".csv");
            form.attr("target", "_blank");
            $("#new_report_search_params_1").submit();
            form.attr("action", originalUrl); //leave things as we found them
            form.attr("target", "");

            return false;
        });
    });


    // CSV Link for report filters...submits form with PDF indicated
    $(function(){
        $(".kpi_export_link").click(function(){
            var form = $("#kpi_user_dashboard");
            var originalUrl = form.attr("action");
            var format = ""
            switch($(this).attr("data-format")){
                case "xls":
                    format = ".xls";
                    break;
                case "pdf":
                    format = ".pdf";
                    break;
            }
            form.attr("action", originalUrl + format);
            form.attr("target", "_blank");
            $("#kpi_user_dashboard").submit();
            form.attr("action", originalUrl); //leave things as we found them
            form.attr("target", "");

            return false;
        });
    });


    $(function(){
        $("#report_search_params_market_id").change(function(){
            $.post("/reports/market_changed", {
                market_id: $(this).val()
            })
        });
    });


    $(function(){
        $("#brand_ambassador_event_account_id").live('change',function(){
            if($("#brand_ambassador_event_account_id option:selected").text() == 'Other'){
                $('#brand_ambassador_event_location_dl').show();
            }
            else
            {
                $('#brand_ambassador_event_location_dl').hide();
            }
        });
    });

    $(function(){
        // Filter start date datepicker
        $("#startDate, #endDate" ).datepicker({
            showOtherMonths: true,
            selectOtherMonths: false,
            dateFormat: 'mm/dd/yy'
          });

        $('#startDate').change(function() {
        $('#endDate').val($('#startDate').val());
        $("#endDate").datepicker( "destroy" );
            $("#endDate").datepicker({
                showOtherMonths: true,
                selectOtherMonths: false,
                dateFormat: 'mm/dd/yy',
                minDate: $('#startDate').datepicker( "getDate" )
            });    
        });  

        // -- Filter Hide/Show
        $(document).on("click", ".btn-filter", function(){
          $(".filter-box").slideToggle(100);
        });

        $('.filter-options').each(function(){
          var numberOfChecked = $(this).find("ul li input:checkbox:checked").length;
          var totalCheckboxes = $(this).find("ul li input:checkbox").length;
          if (totalCheckboxes > 0 && numberOfChecked == totalCheckboxes){
            $(this).find(".option-all :checkbox").attr('checked', true);
          }
        });

        $(document).on("click", '.filter-options .option-all :checkbox', function() {
          $(this).parent().parent().find("ul li :checkbox").attr('checked', this.checked);
        });

        $(document).on("click", '.filter-options ul li :checkbox', function() {
          if (this.checked==false){
            $(this).parent().parent().parent().find(".option-all :checkbox").attr('checked', this.checked);
          }      
        });

        // $(".filter-box .filter-row div.filter-col:last-child").css({"margin-right":"0"});
        $(".filter-cont .filter-options ul").hide();
        $(".filter-cont .filter-options .chosen-drop ul").show();
       
        
        $(document).on("click", ".filter-options .option-all, .chosen-container", function(){
            var allOption = $(this).text().trim();
            $('.filter-box .filter-options, .filter-cont1 .filter-options').each(function(){
                if( $(this).find(".option-all").text().trim() != allOption ){
                    $(this).find(".sign").removeClass('arrowUp');
                    if(!$(this).find("ul").hasClass("chosen-results")){
                        $(this).find("ul").css({"display":"none"});
                    }
                }
            });

            if($(this).attr("data-option") != "expanded"){
                $(this).find(".sign").toggleClass('arrowUp');
                $(this).next("ul").slideToggle(100);
            }
          
        });
        // Brand Activity Report
        $('.hsTr').hide();     
        $(".trHead .sign").on('click', function(){
            //$(".trHead .sign").removeClass('signTogl');
            $(this).toggleClass('signTogl');        
            $(".trHead .contTr").toggle();
            $(this).closest('tr').next('.contTr').toggle(100);
        });


        $('#market_brand_all_user_category_id').live('click', function() {
            $.post("/reports/user_activity_options_changed", {
              market_id: $("input[name='report_search_params[market_id][]']:checked").map(function () {return this.value;}).get().join(","),
              activity_for: "market_brand_all_user",
              brand_id: $("input[name='report_search_params[brand_id][]']:checked").map(function () {return this.value;}).get().join(","),
              category_id: $("input[name='report_search_params[category_id][]']:checked").map(function () {return this.value;}).get().join(","),
              status : $("input[name='report_search_params[active][]']:checked").map(function () {return this.value;}).get().join(",")
            })
        });

        $('#market_brand_all_user_status').live('click', function() {
            $.post("/reports/user_activity_options_changed", {
              market_id: $("input[name='report_search_params[market_id][]']:checked").map(function () {return this.value;}).get().join(","),
              activity_for: "market_brand_all_user",
              brand_id: $("input[name='report_search_params[brand_id][]']:checked").map(function () {return this.value;}).get().join(","),
              category_id: $("input[name='report_search_params[category_id][]']:checked").map(function () {return this.value;}).get().join(","),
              status : $("input[name='report_search_params[active][]']:checked").map(function () {return this.value;}).get().join(",")
            })
        });

        $('#market_brand_all_user_brand_id').live('click', function() {
            $.post("/reports/user_activity_options_changed", {
                market_id: $("input[name='report_search_params[market_id][]']:checked").map(function () {return this.value;}).get().join(","),
                activity_for: "market_brand_all_user",
                brand_id: $("input[name='report_search_params[brand_id][]']:checked").map(function () {return this.value;}).get().join(","),
                category_id: $("input[name='report_search_params[category_id][]']:checked").map(function () {return this.value;}).get().join(","),
                status : $("input[name='report_search_params[active][]']:checked").map(function () {return this.value;}).get().join(",")
            })
        });

        $('#market_brand_all_user_market_id').live('click', function() {
            $.post("/reports/user_activity_options_changed", {
                market_id: $("input[name='report_search_params[market_id][]']:checked").map(function () {return this.value;}).get().join(","),
                activity_for: "market_brand_all_user",
                brand_id: $("input[name='report_search_params[brand_id][]']:checked").map(function () {return this.value;}).get().join(","),
                category_id: $("input[name='report_search_params[category_id][]']:checked").map(function () {return this.value;}).get().join(","),
                status : $("input[name='report_search_params[active][]']:checked").map(function () {return this.value;}).get().join(",")
            })
        });

        $('#brand_ambassador_event_brand_id').live('click', function() {
            $.post("/brand_ambassador_events/brand_changed", {
                brand_id: $(this).val()
            })
        })
    });

    //user_report
     
     $('#all_user_company_id').live('click', function() {
            $.post("/reports/user_report_changed_option", {
              company_id: $("input[name='report_search_params[company_id][]']:checked").map(function () {return this.value;}).get(),
              user_activity_for: "company_user_role_all_user",
              user_role_id: $("input[name='report_search_params[user_role_id][]']:checked").map(function () {return this.value;}).get(),
              status : $("input[name='report_search_params[status][]']:checked").map(function () {return this.value;}).get()
            })
        });

        $('#all_user_role_id').live('click', function() {
            $.post("/reports/user_report_changed_option", {
              company_id: $("input[name='report_search_params[company_id][]']:checked").map(function () {return this.value;}).get(),
              user_activity_for: "company_user_role_all_user",
              user_role_id: $("input[name='report_search_params[user_role_id][]']:checked").map(function () {return this.value;}).get(),
              status : $("input[name='report_search_params[status][]']:checked").map(function () {return this.value;}).get()
            })
        });

        $('#all_user_status').live('click', function() {
            $.post("/reports/user_report_changed_option", {
              company_id: $("input[name='report_search_params[company_id][]']:checked").map(function () {return this.value;}).get(),
              user_activity_for: "company_user_role_all_user",
              user_role_id: $("input[name='report_search_params[user_role_id][]']:checked").map(function () {return this.value;}).get(),
              status : $("input[name='report_search_params[status][]']:checked").map(function () {return this.value;}).get()
            })
        });

        
    //Scrollfollow jquery
    if($(window).width() > 1199){
        $(function() {
            var $sidebar = $("#scroll-follow"), 
            $window = $(window),
            rightOffset = $sidebar.offset(),
            //rightDelta = $(".footer").offset().top - $(".header").offset().top - $(".header").outerHeight() - $("#scroll-follow").outerHeight(),
           topPadding = 15;

            $window.scroll(function() {
                if ($window.scrollTop() > rightOffset.top) {
                    $sidebar.stop().animate({
                        marginTop: Math.min($window.scrollTop() - rightOffset.top + topPadding)//, rightDelta)
                    });
                } else {
                    $sidebar.stop().animate({
                        marginTop: 0
                    });
                }
            });
        });
    }

    //Added for Market Visit & Event Recap Notifications    
    $("#market_visit").click(function(){
        $("#recap_list").hide();
        $("#event_recap_resubmitted_list").hide();
        $("#expense_list").hide();
        $("#sponsorship_activity_pendings_list").hide();
        $("#market_visit_list").toggle();
        // $("#misc_expense_list").hide();
        return false;
    });
    
    $("#event_recap_resubmitted").click(function(){
        $("#market_visit_list").hide();
        $("#expense_list").hide();
        $("#recap_list").hide();
        $("#sponsorship_activity_pendings_list").hide();
        $("#event_recap_resubmitted_list").toggle();
        // $("#misc_expense_list").hide();
        return false;
    });

    $("#event_recap").click(function(){
        $("#market_visit_list").hide();
        $("#expense_list").hide();
        $("#event_recap_resubmitted_list").hide();
        $("#sponsorship_activity_pendings_list").hide();
        $("#recap_list").toggle();
        // $("#misc_expense_list").hide();
        return false;
    });

    $("#expenses").click(function(){
        $("#market_visit_list").hide();
        $("#recap_list").hide();
        $("#expense_list").toggle();
        $("#event_recap_resubmitted_list").hide();
        $("#sponsorship_activity_pendings_list").hide();
        // $("#misc_expense_list").hide();
        return false;
    });

    $("#sponsorship_activity_pendings").click(function(){
        $("#market_visit_list").hide();
        $("#recap_list").hide();
        $("#event_recap_resubmitted_list").hide();
        $("#expense_list").hide();
        $("#sponsorship_activity_pendings_list").toggle();
        // $("#misc_expense_list").hide();
        return false;
    });

    // $("#misc-expenses").click(function(){
    //     $("#market_visit_list").hide();
    //     $("#recap_list").hide();
    //     $("#expense_list").hide();
    //     $("#event_recap_resubmitted_list").hide();
    //     $("#misc_expense_list").toggle();
    //     return false;
    // });
    
    $('body').on("click", function () { // you don't need the else part to fadeout
      var $el = $(".notification-list-wrapper");
      if ($el.is(":visible")) {
          $el.fadeOut(200);
      }
   });

   // $("body").on("click",function(){
   //      if($(".treewrapper").hasClass('treevisible')){
   //          $(".treewrapper").hide();
   //      }
   //  });
    
    // $('.chosentree-search').on('click',function(e){
    //     $(".treewrapper").show();
    //     e.stopImmediatePropagation(); 
    // });  
});

function ReadyHeaderLinks(){
    // Make header column sort links AJAX if data attributes exist
    $(".sort_link").click(function(){
        uri =  $(this).attr("data-uri");
        col =  $(this).attr("data-sort-col");
        if(uri != null && col != null){
            $.get(uri, {
                sort: col
            })
            return false;
        }
        else{
            return true;
        }
    });
}

function numeric_validation(){
    var valid = true;
    if( $('[id^=count]').length )
    {
     $("[id^=count]").each(function(){
        if ($(this).val() == "" || $(this).val() == 0) {
          valid = false;
          $(this).css('border-color', 'red');
        }else{
          $(this).css('border-color','');
        }
      });
    };
    if($("input[name^='market_ids']").length){
            if($( "input[name^='market_ids']" ).val() == 0 || $( "input[name^='market_ids']" ).val() == ""){
                valid = false;
            }else{
                $(this).css('border-color', '');
            }
    };
      
      if(valid){
        if($("#errID").length == 1){
           $("#errID").remove();
        }
        return true;
      }
      else{
        //alert('Value can not be blank!!');
        if($("#errID").length == 1){
           $("#errID").remove();
        }
        $('form').prepend("<div id='errID' style='color:red;padding-left: 2%;'>Value can not be blank!!</div>");
        return false;
    }
    //return true;
}

// This could be just ShowDialog instead, but was originally just for the event dialog.
function ShowEventDialog(title, html, formName, hideButtons){
    var buttons = null;

    if(formName == null)
        formName = "#new_user_training" //random...
    if(!hideButtons)
        buttons = {
            Create: function() {
                $(formName).trigger('submit');
                $("#dialog").dialog('close');
            },
            Cancel: function() {
                $(this).dialog('close');
            }
        };

    $("#dialog").html(html);

    $("#dialog").dialog({
        autoOpen: false,
        modal: true,
        title: title,
        width: "auto",
        height: "auto",
        buttons: buttons,
        open: function (event, ui) { window.setTimeout(function () {
            jQuery(document).unbind('mousedown.dialog-overlay').unbind('mouseup.dialog-overlay'); }, 100);
        }
    });

    $(".picker").datetimepicker({
        ampm: true,
        stepMinute: 15,
        showOn: "both",
        timeFormat: 'hh:mm tt',
        buttonImage: "/assets/icon-spendDate.gif", 
        buttonImageOnly: true,
        showOtherMonths: true,
        selectOtherMonths: false,
        minDate: (new Date(((new Date().getFullYear()) - 2), 11, 1))
    });
    $(".date-picker").datepicker({
        showOn: "both",
        buttonImage: "/assets/icon-spendDate.gif", 
        buttonImageOnly: true,
        showOtherMonths: true,
        selectOtherMonths: false,
        minDate: (new Date(((new Date().getFullYear()) - 2), 11, 1))
    });

    $("#dialog").dialog("open");

    $("#cancel-popup-close").bind("click", function(e) {        
        $("#dialog").dialog("close");
        e.preventDefault();
    });

}
function idealTextColor(bgColor) {
   var nThreshold = 105;
   components = bgColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
   var bgDelta = (components[1] * 0.299) + (components[2] * 0.587) + (components[3] * 0.114);

   return ((255 - bgDelta) < nThreshold) ? "#000000" : "#ffffff";   
}

//Numeric value validation
function isNumber(n) {
    if(n.value.indexOf(".")==-1)
    n.value = n.value.replace(/[^\d]+/g, '');
}