import * as React from 'react';
import { ArrSchema, DataType, ItemSchema } from '../../schema';
import { TypeWidget, UiCustom } from '../../schema';
import { TextWidget } from './textWidget';
import { TextAreaWidget } from './textareaWidget';
import { PasswordWidget, UrlWidget, EmailWidget } from './passwordWidget';
import { UpdownWidget } from './updownWidget';
import { NumberWidget } from './numberWidget';
import { DateWidget, DateTimeWidget, TimeWidget, MonthWidget } from './dateWidget';
import { CheckBoxWidget } from './checkBoxWidget';
import { FieldProps } from '../field';
import { Context } from '../context';
import { SelectWidget } from './selectWidget';
import { RadioWidget } from './radioWidget';
import { RangeWidget } from './rangeWidget';
import { IdWidget } from './idWidget';
import { ButtonWidget } from './buttonWidget';
import { ArrComponent } from './arrComponent';
import { ImageWidget } from './imageWidget';
import { TagSingleWidget, TagMultiWidget } from './tagWidget';

interface WidgetFactory {
	widget?: TypeWidget;
	dataTypes?: DataType[];
};

const stringWidget: WidgetFactory = {
	dataTypes: ['integer', 'number', 'string'],
	widget: TextWidget
};

const widgetFactories: {[type: string]: WidgetFactory} = {
    id: {
        dataTypes: ['id'],
        widget: IdWidget,
    },
    text: stringWidget,
	string: stringWidget,
    textarea: {
        dataTypes: ['string'],
        widget: TextAreaWidget
    },
    password: {
        dataTypes: ['string'],
        widget: PasswordWidget
    },
    date: {
        dataTypes: ['date'],
        widget: DateWidget
    },
    datetime: {
        dataTypes: ['date'],
        widget: DateTimeWidget
    },
    time: {
        dataTypes: ['date'],
        widget: TimeWidget
    },
    month: {
        dataTypes: ['date'],
        widget: MonthWidget
    },
    select: {
        dataTypes: ['integer', 'number', 'string', 'date', 'boolean'],
        widget: SelectWidget
    },
    url: {
        dataTypes: ['string'],
        widget: UrlWidget
    },
    email: {
        dataTypes: ['string'],
        widget: EmailWidget
    },
    number: {
        dataTypes: ['integer', 'number'],
        widget: NumberWidget
    },
    updown: {
        dataTypes: ['integer', 'number'],
        widget: UpdownWidget
    },
    color: {

    },
    checkbox: {
        dataTypes: ['boolean', 'integer', 'number'],
        widget: CheckBoxWidget
    },
    image: {
        dataTypes: ['string'],
        widget: ImageWidget,
    },
    checkboxes: {

    },
    radio: {
        dataTypes: ['integer', 'number', 'string', 'date', 'boolean'],
        widget: RadioWidget
	},
	tagSingle: {
		dataTypes: ['integer'],
		widget: TagSingleWidget
	},
	tagMulti: {
		dataTypes: ['string'],
		widget: TagMultiWidget
	},
    range: {
        dataTypes: ['integer'],
        widget: RangeWidget,
    },
    button: {
        dataTypes: ['button', 'submit'],
        widget: ButtonWidget,
    }
}

export function factory(context: Context, itemSchema: ItemSchema, children:React.ReactNode, fieldProps?: FieldProps):JSX.Element {
    if (context === undefined) {
        debugger;
        return null;
    }
    if (itemSchema === undefined) return undefined;
    let {name, type} = itemSchema;
    switch (type) {
    case 'arr':
        let arrSchema = context.getItemSchema(name) as ArrSchema;
        return <ArrComponent parentContext={context} arrSchema={arrSchema} children={children} />;
    default:
        break;
    }

    let typeWidget: TypeWidget;
    let ui = context.getUiItem(name);	
    function getTypeWidget(t:DataType): TypeWidget {
        switch(t) {
        default: return TextWidget; 
        case 'id': return IdWidget;
        case 'integer': return UpdownWidget;
        case 'number': return NumberWidget; 
        case 'string': return TextWidget; 
        case 'date': return DateWidget; 
        case 'boolean': return CheckBoxWidget; 
        case 'button':
        case 'submit': return ButtonWidget;
        }
    }
    if (ui === undefined) { 
        typeWidget = getTypeWidget(type);
    }
    else {
        let {widget:widgetType, hiden} = ui;
		if (hiden === true) return null;
        switch (widgetType) {
        default:
            if (widgetType !== undefined) {
                let widgetFactory = widgetFactories[widgetType];
				if (!widgetFactory) {
					debugger;
					throw new Error(`unknown widget ${widgetType}`);
				}
                typeWidget = widgetFactory.widget;
            }
            if (typeWidget === undefined) typeWidget = getTypeWidget(type);
            break;
        case 'custom':
            typeWidget = (ui as UiCustom).WidgetClass;
            break;
        case 'group':
            return <span>impletment group</span>;
        }
        //label = uiLabel || name;
    }
    
	let {widgets} = context;
	let widget = widgets[name];
	if (!widget) {
		widget = new typeWidget(context, itemSchema, fieldProps, children);
		widget.init();
		widgets[name] = widget;
	}

    return <widget.container />;
    /*
    if (isRow === false) {
        let WidgetElement = observer(() => widget.container());
        return <WidgetElement />;
    }
    else {
        let widgetElement = widget.container();
        return widgetElement;
    }
    */
}

