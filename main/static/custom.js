$(document).ready(function(){
	$("#loadMore").on('click',function(){
		var _currentProducts=$(".product-box").length;
        var _limit=$(this).attr('data-limit');
		var _total=$(this).attr('data-total');
        
        		// Start Ajax
		$.ajax({
			url:'/load-more-data',
			data:{
				limit:_limit,
				offset:_currentProducts
			},
			dataType:'json',
			beforeSend:function(){
				$("#loadMore").attr('disabled',true);
				$(".load-more-icon").addClass('fa-spin');
			},
			success:function(res){
				$("#filteredProducts").append(res.data);
				$("#loadMore").attr('disabled',false);
				$(".load-more-icon").removeClass('fa-spin');

				var _totalShowing=$(".product-box").length;
				if(_totalShowing==_total){
					$("#loadMore").remove();
				}
			}
		});
		// End
    });

	// Product Variation
	$(".choose-size").hide();

	// Show size according to selected color
	$(".choose-color").on('click',function(){
		$(".choose-size").removeClass('active');
		$(".choose-color").removeClass('focused');
		$(this).addClass('focused');

		var _color=$(this).attr('data-color');

		$(".choose-size").hide();
		$(".color"+_color).show();
		$(".color"+_color).first().addClass('active');

		var _price=$(".color"+_color).first().attr('data-price');
		$(".product-price").text(_price);

	});
	// End

	// Show the price according to selected size
	$(".choose-size").on('click',function(){
		$(".choose-size").removeClass('active');
		$(this).addClass('active');

		var _price=$(this).attr('data-price');
		$(".product-price").text(_price);
	})
	// End

	// Show the first selected color
	$(".choose-color").first().addClass('focused');
	var _color=$(".choose-color").first().attr('data-color');
	var _price=$(".choose-size").first().attr('data-price');

	$(".color"+_color).show();
	$(".color"+_color).first().addClass('active');
	$(".product-price").text(_price);

	// Add to cart
	$(document).on('click',"#addToCartBtn",function(){
		var _vm=$(this);
		var _qty=$("#productQty").val();
		var _productId=$(".product-id").val();
		var _productImage=$(".product-image").val();
		var _productTitle=$(".product-title").val();
		var _productPrice=$(".product-price").text();
		// Ajax
		$.ajax({
            url:'/add-to-cart',
            data:{
				'id':_productId,
				'image':_productImage,
				'qty':_qty,
				'title':_productTitle,
				'price':_productPrice
			},
            dataType:'json',
            beforeSend:function(){
				_vm.attr('disabled',true);
            },
            success:function(res){
                $("cart-list").text(res.totalitems);
				_vm.attr('disabled',false);
            }
        });
		// End
	});
	// End

	// Delete item from cart
	$(document).on('click','.delete-item',function(){
		var _pId=$(this).attr('data-item');
		var _vm=$(this);
		// Ajax
		$.ajax({
            url:'/delete-from-cart',
            data:{
				'id':_pId,
			},
            dataType:'json',
            beforeSend:function(){
				_vm.attr('disabled',true);
            },
            success:function(res){
                $("cart-list").text(res.totalitems);
				_vm.attr('disabled',false);
				$("#cartList").html(res.data);
            }
        });
		// End
	});

	// Update item from cart
	$(document).on('click','.update-item',function(){
		var _pId=$(this).attr('data-item');
		var _pQty=$(".product-qty-"+_pId).val();
		var _vm=$(this);
		// Ajax
		$.ajax({
			url:'/update-cart',
			data:{
				'id':_pId,
				'qty':_pQty,
			},
			dataType:'json',
			beforeSend:function(){
				_vm.attr('disabled',true);
			},
			success:function(res){
				// $("cart-list").text(res.totalitems);
				_vm.attr('disabled',false);
				$("#cartList").html(res.data);
			}
		});
		// End
	});

});