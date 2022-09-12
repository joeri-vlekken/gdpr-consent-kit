const consentKit=settings=>{window.addEventListener("load",()=>{const consent_banner=document.getElementById("consent_banner");const consent_curtain=document.getElementById("consent_curtain");const consent_settings=document.getElementById("consent_settings");const consent_all=document.querySelectorAll(".consent_agree");const consent_update=document.getElementById("cookies_update");let cookie_consented=[];const setCookie=()=>{let expires;let date=new Date;date.setTime(date.getTime()+settings.expiry_days*24*60*60*1e3);expires="; expires="+date.toGMTString();document.cookie=settings.cookie_name+"="+cookie_consented+expires+"; path=/";consent_banner.classList.add("hidden");consent_curtain.classList.add("hidden")};const agreeAll=()=>{document.querySelectorAll(".cookie_switch .switch").forEach(cookie_switch=>{cookie_consented.push(cookie_switch.querySelector("input").name.substring(7))});setCookie()};const getCookie=cname=>{let name=cname+"=";let ca=document.cookie.split(";");for(let i=0;i<ca.length;i++){let c=ca[i];while(c.charAt(0)===" "){c=c.substring(1)}if(c.indexOf(name)===0){return c.substring(name.length,c.length)}}return""};const consentBanner=()=>{let consent=getCookie(settings.cookie_name);if(consent!==""){}else{showBanner()}};const showBanner=()=>{consent_banner.classList.remove("hidden")};const switchCookie=e=>{let input=e.currentTarget.querySelector("input");let display=e.currentTarget.parentElement.querySelector(".cookie_display");if(input.checked){display.classList.add("enabled");cookie_consented.push(input.name.substring(7))}else{display.classList.remove("enabled");cookie_consented=cookie_consented.filter(cookie=>cookie!==input.name.substring(7))}};updateConsent=()=>{cookie_consented.push("essential");setCookie()};const closeCurtain=()=>{consent_curtain.classList.add("hidden")};const showCurtain=()=>{consent_curtain.classList.remove("hidden");let close_link=document.getElementById("curtain_close");if(close_link)close_link.addEventListener("click",closeCurtain);document.querySelectorAll(".cookie_switch .switch").forEach(cookie_switch=>{if(!cookie_switch.classList.contains("locked"))cookie_switch.addEventListener("click",switchCookie)});consent_update.addEventListener("click",updateConsent)};const switchTab=e=>{let page=e.currentTarget.dataset.page;document.querySelectorAll(".cookies .filters > li").forEach(tab=>{tab.firstChild.classList.remove("active")});e.currentTarget.classList.add("active");document.querySelectorAll(".cookies .cookie_content .cookie").forEach(page=>{page.classList.remove("active")});document.querySelector(`.cookies .cookie_content .cookie[data-page="${page}"]`).classList.add("active");document.querySelector(".cookies .cookie_content").scrollTop=0};consent_settings.addEventListener("click",showCurtain);consent_all.forEach(consent=>{consent.addEventListener("click",agreeAll)});document.querySelectorAll(".cookies .filters > li").forEach(tab=>{tab.firstChild.addEventListener("click",switchTab)});consentBanner()})};