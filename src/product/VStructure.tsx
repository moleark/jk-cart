/* eslint-disable */
import * as React from 'react';
import { VPage, Scroller } from 'tonva';
import { CProduct } from './CProduct';
import { List } from 'tonva';
import { Product } from '../store';
import Pagination from 'antd/lib/pagination/Pagination';
import { observer } from 'mobx-react';
import { pageHTitle } from 'tools/pageHeaderTitle';

export class VStructure extends VPage<CProduct> {

    init() {}

    header() {
        return "";
    }

    content() {
        return <this.contentView />
    }

    callStructureSearchs = () => {
        window.callStructureSearch();
    }

    private contentView = observer(() => {
        return <div className="mb-5">
            {pageHTitle(<div className="text-left">结构式搜索</div>)}
            {/* <iframe id="drawmolecule" src="/resources/drawmoleculeGWT/Drawmolecule.html" width="1014" height="425" scrolling="no">
                <script src='/resources/drawmoleculeGWT/drawmolecule/drawmolecule.nocache.js'></script>
            </iframe> */}
            <iframe id="drawmolecule" src="http://54.160.165.9:8080/drawmoleculeGWT/Drawmolecule.html" width="1014" height="425" scrolling="no">
                <script src='http://54.160.165.9:8080/drawmoleculeGWT/drawmolecule/drawmolecule.nocache.js'></script>
            </iframe>
            <button onClick={()=>{this.callStructureSearchs() }} type="button" className="btn btn-sm btn-secondary" >结构式查询</button>
            
            <div className="h4">查询结果</div>
            <div id="moleculeCanvases" className="row"></div>
        </div>
    })
}