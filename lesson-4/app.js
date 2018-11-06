$('.control-top a').on('click', function(){  
    $('.control-top a').removeClass('active');
    $(this).addClass('active');

    $('.control-main div').removeClass();
    $('.control-main div').addClass('hidden');
    $(('div #p-') + $(this)[0].id).addClass('show');   
})