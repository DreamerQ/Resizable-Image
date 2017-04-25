function ResizeImage(options) {
    var wrap = options.elem;
	var image = wrap.querySelector('.img');
    var controls = wrap.querySelectorAll('.control');
    var widthToHeight = image.offsetWidth / image.offsetHeight;
    console.log('widthToHeight = ' + widthToHeight);
    
    document.onmousedown = ChangeImg;
    document.addEventListener("mousedown", activeToggle);

    function ChangeImg(e) {
        e = e || window.event;
        var shiftX, shiftY;

        if (e.target.classList.contains('control')) {
            var control = e.target;

            document.onmousemove = function (e) {
                resizeImg(e.clientX, e.clientY);
            };

            document.onmouseup = function () {
                finishResize();
            };

            return false;
        }
        if ( !e.target.classList.contains('img') ) return;

        var target = e.target.parentNode;

        startDrag(e.clientX, e.clientY);

        document.onmousemove = function (e) {
            moveAt(e.clientX, e.clientY);
        };

        target.onmouseup = function () {
            finishDrag();
        };
        //-------------------------------------------
        function startDrag(clientX, clientY) {

            shiftX = clientX - target.getBoundingClientRect().left;
            shiftY = clientY - target.getBoundingClientRect().top;

            target.style.position = 'absolute';

            document.body.appendChild(target);

            moveAt(clientX, clientY);
        }

        function finishDrag() {
            target.style.position = 'absolute';

            document.onmousemove = null;
            target.onmouseup = null;
        }

        function moveAt(clientX, clientY) {
            var newX = clientX - shiftX;
            var newY = clientY - shiftY;

            target.style.left = newX + 'px';
            target.style.top = newY + 'px';
        }


        function resizeImg(clientX, clientY) {
            var imgX = image.getBoundingClientRect().left + image.offsetWidth;
			var imgY = image.getBoundingClientRect().top + image.offsetHeight;

            var currentWidth = image.offsetWidth;
			var currentHeight = image.offsetHeight;

            var newWidth = currentHeight * widthToHeight;

            if ( control.classList.contains('right') ) {
                image.style.width = currentWidth + (clientX - imgX) + 'px';
                widthToHeight = image.offsetWidth / image.offsetHeight;
            }
			
			if ( control.classList.contains('left') ) {
				image.style.width = currentWidth + (image.getBoundingClientRect().left - clientX - 1) + 'px';
				wrap.style.left = clientX + 'px';
                widthToHeight = image.offsetWidth / image.offsetHeight;
			}
			
			if ( control.classList.contains('bottom') ) {
                image.style.height = currentHeight + (clientY - imgY) + 'px';
                widthToHeight = image.offsetWidth / image.offsetHeight;
            }
			
			if ( control.classList.contains('top') ) {
				image.style.height = currentHeight + (image.getBoundingClientRect().top - clientY - 1) + 'px';
				wrap.style.top = clientY + 'px';
                widthToHeight = image.offsetWidth / image.offsetHeight;
			}

            if ( control.classList.contains('top-right') ) {
                image.style.height = currentHeight + (image.getBoundingClientRect().top - clientY - 1) + 'px';

                wrap.style.top = clientY + 'px';

                currentHeight = image.offsetHeight;

                image.style.width = newWidth + 'px';
            }

            if ( control.classList.contains('top-left') ) {
                image.style.height = currentHeight + (image.getBoundingClientRect().top - clientY - 1) + 'px';
                wrap.style.top = clientY + 'px';

                currentHeight = image.offsetHeight;
                newWidth = Math.round(currentHeight * widthToHeight);

                image.style.width = newWidth + 'px';
                wrap.style.left = wrap.getBoundingClientRect().left + (currentWidth - newWidth) + 'px';
            }

            if ( control.classList.contains('bottom-right') ) {
                image.style.height = currentHeight + (clientY - imgY) + 'px';

                currentHeight = image.offsetHeight;
                newWidth = currentHeight * widthToHeight;

                image.style.width = newWidth + 'px';
            }

            if ( control.classList.contains('bottom-left') ) {
                image.style.height = currentHeight + (clientY - imgY) + 'px';

                currentHeight = image.offsetHeight;
                newWidth = Math.round(currentHeight * widthToHeight);

                image.style.width = newWidth + 'px';
                wrap.style.left = wrap.getBoundingClientRect().left + (currentWidth - newWidth) + 'px';
            }
        }

        function finishResize() {
            document.onmousemove = null;
            document.onmouseup = null;
        }

        return false;
    }

    function activeToggle(e) {
        e = e || window.event;
        var target = e.target;

        if (target === image ) {
            wrap.classList.add('active');

            for (var i = 0; i < controls.length; i++) {
                controls[i].classList.add('visible');
            }
            return;
        }
        if ( target != image && !target.classList.contains('control') ) {
            wrap.classList.remove('active');

            for (var j = 0; j < controls.length; j++) {
                controls[j].classList.remove('visible');
            }
        }
    }

}