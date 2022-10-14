import {EEnv, Env} from '../env';
import {insertCss} from "@/lib/util/_util";
import {createIcon} from "@/lib/util";

export interface INotificationParams {
    message?: string;
    description?: string;
}

const theme: { [key: string]: { [key: string]: string } } = {
    light: {
        background: '#fff',
        color: '#323232',
        boxShadow: '0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%)',
    },
    dark: {
        background: '#323232',
        color: '#fff',
        boxShadow: 'rgb(0 0 0 / 20%) 0px 3px 5px -1px, rgb(0 0 0 / 14%) 0px 6px 10px 0px, rgb(0 0 0 / 12%) 0px 1px 18px 0px',
    },
};

/**
 * 仅为了某些地方和第三方库结偶，不要用到业务里面
 */
export class notification {
    static map: { [key: string]: HTMLDivElement } = {}
    static loop: HTMLDivElement[] = []
    static body = globalThis?.document?.body || {};
    static modeId = 'colorScheme'
    static modeAttr = 'content'


    /**
     *
     */
    constructor() {
        //

    }

    static open: (params: INotificationParams) => void = (params) => {
        const document = globalThis.document;
        if(document){
            return notification.addNotification(params,document);
        }

    }

    static addNotification: (params: INotificationParams,document:Document) =>  void = (params,document) => {
        insertCss();
        const env = Env.getEnv();
        if (env == EEnv.client) {
            const mask = notification.createMask(document);
            const dom = notification.createDom(document, params);
            notification.addDom(mask,dom);

        } else {
            console.error(`${params.message}:${params.description}`);
        }
    }


    static createMask: (document: Document) => HTMLDivElement = (document) => {
        // if(document.getElementById(''))
        const _dom = document.getElementById('self-lib-notification') as HTMLDivElement
        if(_dom){
            return _dom
        }
        const dom = document.createElement('div');
        dom.id='self-lib-notification'
        dom.style.position = 'fixed';
        dom.style.top = '12px';
        dom.style.right = '12px';
        dom.style.width = '384px'
        dom.style.zIndex = '999999';

        return dom;
    }

    static createDom: (document: Document, params: INotificationParams) => HTMLDivElement = (document, params) => {
        const tag = new Date().getTime().toString() + Number.parseInt(`${Math.random() * 100}`, 0);


        // notificationDom

        const icon =  document.createElement('div');
        icon.innerHTML= `${createIcon('close')}`
        icon.onclick = ()=> {
            notification.destroy(tag);
        };
        const title =  document.createElement('div');
        title.style.fontSize = '16px';
        title.style.marginBottom = '8px';
        title.style.lineHeight = '24px';
        title.innerHTML = `${params.message}`
        const tip = document.createElement('div');
        const tipTitle = document.createElement('div')
        tipTitle.style.display = 'flex'
        tipTitle.style.justifyContent = 'space-between'
        tipTitle.appendChild(title)
        tipTitle.appendChild(icon)
        const tipContext = document.createElement('pre')
        tipContext.style.fontSize ='14px'
        tipContext.style.whiteSpace='pre-wrap';
        tipContext.innerHTML = `${params.description}`
        const mode = document.getElementById(notification.modeId)?.getAttribute(notification.modeAttr) || 'dark';
        tip.appendChild(tipTitle)
        tip.appendChild(tipContext)
        tip.style.width = '100%'
        tip.style.padding = '16px 24px';
        tip.style.display = 'flex';
        tip.style.flexDirection = 'column';
        tip.style.color = theme[mode].color;
        tip.style.background = theme[mode].background;
        tip.style.boxShadow = theme[mode].boxShadow;
        tip.style.borderRadius = '4px';
        tip.style.left = '400px'
        tip.style.position='relative'
        tip.style.marginBottom='12px'
        tip.style.transition = 'all 0.28s';
        notification.map[tag] = tip;
        return tip;
    }
    private static addDom: (mask:HTMLDivElement,dom: HTMLDivElement) => void = (mask,dom) => {
        mask.appendChild(dom)
        notification.loop.push(dom);

        notification.body.appendChild(mask);
        setTimeout(() => {
            dom.style.left = '0px'
            dom.style.opacity = `1`;
        }, 50);

    }
    static removeDom = (domTag: string) => {
        const dom = notification.map[domTag];
        if (dom) {
            const length = notification.loop.length;
            for (let i = 0; i < length; i++) {
                if (notification.loop[i] == dom) {
                    notification.loop = [...notification.loop.slice(0, i), ...notification.loop.slice(i + 1)];
                    break;
                }
            }
            delete notification.map[domTag];
            dom.style.opacity = '0';
            setTimeout(() => {
                dom.remove();
            }, 280);
        }
    }
    static destroy: (tag?: string) => void = (tag) => {
        if (tag) {
            notification.removeDom(tag);
        } else {
            for (const tagKey in notification.map) {
                if (notification.map.hasOwnProperty(tagKey)) {
                    notification.removeDom(tagKey);
                }
            }
        }
    }
}

export default notification;
