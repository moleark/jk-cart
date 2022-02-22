import * as React from 'react';
import classNames from 'classnames';
import { UiRange } from '../../schema';
import { Widget } from './widget';

export class RangeWidget extends Widget {
    protected inputType = 'range';
    protected input: HTMLInputElement;
    protected get ui(): UiRange {return this._ui as UiRange};

    setReadOnly(value:boolean) {this.input.readOnly = this.readOnly = value}
    setDisabled(value:boolean) {this.input.disabled = this.disabled = value}

    render() {
        let {min, max, step} = this.ui;
        return <><input ref={input=>this.input = input}
            className={classNames(this.className, 'form-control', 'w-min-6c')}
            type={this.inputType}
            defaultValue={this.defaultValue} 
            onChange={this.onInputChange}
            max={max}
            min={min}
            step={step}
            />
        </>;
    }
}
