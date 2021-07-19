import { Input, InputProps } from "./input";

interface InputCheckBoxProps extends InputProps {
}

export class InputCheckBox extends Input<InputCheckBoxProps, boolean> {
    protected get type(): 'text' | 'number' | 'checkbox' | 'radio' {return 'checkbox'}

    protected valueFromInput(): boolean {
        return this.input.checked;
    }
    onBlur() {}
    onFocus() {}
    protected logInputID(suffix?: string) {}
}
/*
export function InputCheckBox(props: InputCheckBoxProps): JSX.Element {
    let input = new ClassInputCheckBox(props);
    input.init();
    return input.render();
}
*/
