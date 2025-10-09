/*! HTML5 Shiv pre3.5 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
  Uncompressed source: https://github.com/aFarkas/html5shiv  */
 // HTML5 Shiv: Enables styling and element creation for HTML5 elements in older IE
 //在老板IE（IE6-8）中启用HTML5新标签（article，section，nav），让他们可以被document.createElement/document.createDocumentFragment创建，拥有子节点
 //应用CSS样式，在打印前后被正确渲染并恢复
 //通过特征检测、注入样式、重写DOM、打印钩子（onbeforeprint/onafterprint）实现
 //在现代浏览器中无需使用；它是过往为兼容 IE6–8 的历史工具
 // a = window, b = document
 (function (a, b) {
    // Inject a <style> block into <head> with the provided CSS string
    function h(a, b) { // h(window,document)避免全局污染
        var c = a.createElement("p"),
            d = a.getElementsByTagName("head")[0] || a.documentElement;//d是head元素 往head插入<style>,注入兼容需的css（如让HTML5标签dsiplay:block）
        return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
    }

    // Return the list of HTML5 element names to shiv (array)
    function i() {
        var a = l.elements;
        return typeof a == "string" ? a.split(" ") : a //需要shiv的标签列表，从全局配置l.elements获取？？？
    }

    // Monkey-patch document.createElement and document.createDocumentFragment
    // so that unknown elements are recognized and can have children in old IE
    function j(a) { //j(document)完成DOM方法修补
        var b = {},
            c = a.createElement, //打补丁老IE的document.createElement和document.createDocumentFragment
            f = a.createDocumentFragment, //预创建所有目标标签，IE认识他们
            g = f();
        a.createElement = function (a) { 
            l.shivMethods || c(a);
            var f;
            // Cache created elements to speed up future calls; ensure they can have children
            return b[a] ? f = b[a].cloneNode() : e.test(a) ? f = (b[a] = c(a)).cloneNode() : f = c(a), f.canHaveChildren &&
                !d.test(a) ? g.appendChild(f) : f
        }, a.createDocumentFragment = Function("h,f",
            "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + i().join().replace(
                /\w+/g,
                function (a) {
                    return b[a] = c(a), g.createElement(a), 'c("' + a + '")'
                }) + ");return n}")(l, g)
    }

    // Shiv a document: inject CSS for HTML5 elements and patch methods if needed
    function k(a) { //核心入口shivDocument
        var b;
        return a.documentShived ? a : (l.shivCSS && !f && (b = !!h(a, //在文档上打标记documentShived，避免重复处理
            "article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}audio{display:none}canvas,video{display:inline-block;*display:inline;*zoom:1}[hidden]{display:none}audio[controls]{display:inline-block;*display:inline;*zoom:1}mark{background:#FF0;color:#000}"
        )), g || (b = !j(a)), b && (a.documentShived = b), a)
    }

    // Before print: apply VML-like wrappers to HTML5 elements in old IE
    function p(a) {  //遍历文档所有节点，找到HTML5新元素，包裹到一个命名空间标签（html5shiv:article）中，便于老IE打印识别
        var b, c = a.getElementsByTagName("*"),
            d = c.length,
            e = RegExp("^(?:" + i().join("|") + ")$", "i"),
            f = [];
        while (d--) b = c[d], e.test(b.nodeName) && f.push(b.applyElement(q(b)));
        return f
    }

    // Create an element with namespaced tag (e.g., html5shiv:article) copying attributes/styles
    function q(a) { //创建带命名空间前缀的新元素，复制属性和样式
        var b, c = a.attributes,
            d = c.length,
            e = a.ownerDocument.createElement(n + ":" + a.nodeName);
        while (d--) b = c[d], b.specified && e.setAttribute(b.nodeName, b.nodeValue);
        return e.style.cssText = a.style.cssText, e
    }

    // Rewrite CSS selectors to target namespaced elements for printing (old IE)
    function r(a) { //重写CSS选择器，把设计HTML5新元素选择器替换成命名空间版本（如article->html5shiv:article），打印时老IE能匹配
        var b, c = a.split("{"),
            d = c.length,
            e = RegExp("(^|[\\s,>+~])(" + i().join("|") + ")(?=[[\\s,>+~#.:]|$)", "gi"),
            f = "$1" + n + "\\:$2";
        while (d--) b = c[d] = c[d].split("}"), b[b.length - 1] = b[b.length - 1].replace(e, f), c[d] = b.join("}");
        return c.join("{")
    }

    // Cleanup applied wrappers after printing
    function s(a) { //清理p()应用的命名空间包裹节点
        var b = a.length;
        while (b--) a[b].removeNode()
    }

    // Hook into onbeforeprint/onafterprint to shiv the document styles for print in old IE
    function t(a) { //print-shiv挂钩
        var b, c, d = a.namespaces, //老IE中注册onbeforeprint
            e = a.parentWindow;
        return !o || a.printShived ? a : (typeof d[n] == "undefined" && d.add(n), e.attachEvent("onbeforeprint",
            function () {
                var d, e, f, g = a.styleSheets,
                    i = [],
                    j = g.length,
                    k = Array(j);
                while (j--) k[j] = g[j];
                while (f = k.pop())
                    if (!f.disabled && m.test(f.media)) {
                        for (d = f.imports, j = 0, e = d.length; j < e; j++) k.push(d[j]);
                        try {
                            i.push(f.cssText)
                        } catch (l) {}
                    } i = r(i.reverse().join("")), c = p(a), b = h(a, i)
            }), e.attachEvent("onafterprint", function () {
            s(c), b.removeNode(!0)
        }), a.printShived = !0, a)
    }
    // Configuration and feature-detection flags
    var c = a.html5 || {}, //外部可通过windows.html5传入自定义配置（元素列表，是否注入CSS，是否修补方法）
        d = /^<|^(?:button|form|map|select|textarea|object|iframe)$/i,
        e =
        /^<|^(?:a|b|button|code|div|fieldset|form|h1|h2|h3|h4|h5|h6|i|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul)$/i,
        f, g; //f:是否支持hidden属性，g:是否支持创建未知元素
    // Feature detect: hidden property support and ability to create unknown elements
    (function () {
        var c = b.createElement("a");
        c.innerHTML = "<xyz></xyz>", f = "hidden" in c, f && typeof injectElementWithStyles == "function" &&
            injectElementWithStyles("#modernizr{}", function (b) {
                b.hidden = !0, f = (a.getComputedStyle ? getComputedStyle(b, null) : b.currentStyle).display ==
                    "none"
            }), g = c.childNodes.length == 1 || function () {
                try {
                    b.createElement("a")
                } catch (a) {
                    return !0
                }
                var c = b.createDocumentFragment();
                return typeof c.cloneNode == "undefined" || typeof c.createDocumentFragment == "undefined" ||
                    typeof c.createElement == "undefined"
            }()
    })();
    // Public API: configuration object exposed as window.html5
    var l = { //l是公开API配置对象，挂到window.html5上
        elements: c.elements ||
            "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
        shivCSS: c.shivCSS !== !1,
        shivMethods: c.shivMethods !== !1,
        type: "default",
        shivDocument: k
    };
    a.html5 = l, k(b);
    // Regex for matching print media types
    var m = /^$|\b(?:all|print)\b/, //m：匹配打印媒体类型的正则表达式
        n = "html5shiv", //n：命名空间前缀
        // Old-IE detection for print-shiv capability
        o = !g && function () { //o：判断是否需要并刻进行打印修补的老IE环境（存在namespaces，applyElement,removeNode,attachEvent）
            var c = b.documentElement;
            return typeof b.namespaces != "undefined" && typeof b.parentWindow != "undefined" && typeof c.applyElement !=
                "undefined" && typeof c.removeNode != "undefined" && typeof a.attachEvent != "undefined"
        }();
    l.type += " print", l.shivPrint = t, t(b) //l.type:类型，l.shivPrint:打印修补函数，t(b)：执行打印修补
})(this, document)