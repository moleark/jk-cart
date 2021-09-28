import { observer } from 'mobx-react';
import * as React from 'react';

export interface PColumnsItem{
    id: number,
    name:string,
}

export interface PListTableProps{
    columns: PColumnsItem[],
    content?: any,
}

export class ListTable extends React.Component<PListTableProps>{
    /* constructor(props:any) {
        super(props);
    } */

    render() {
        let { columns, content } = this.props;
        return  React.createElement(observer(() => {
            return <div className="tab-pane fade show active mt-3" id="nav-order-1" role="tabpanel">
				<div className="table-responsive-vertical shadow-z-1">
					<table id="table" className="table article-product-table order-wrap">
						<thead style={{background:'#D8D8D8'}}>
                            <tr>
                                {columns.map((v: any) =>(<th key={v.id} className="py-2">{v.name}</th>))}
							</tr>
						</thead>
						<tbody>
							{content}
						</tbody>
					</table>
				</div>
			</div>    
		}));
    }
}