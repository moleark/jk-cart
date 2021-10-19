/* eslint-disable */
import * as React from 'react';
import { VPage, List } from 'tonva-react';
import { CProduct } from './CProduct';
import { Product } from '../store';
import Pagination from 'antd/lib/pagination/Pagination';
import { observer } from 'mobx-react';
import { pageHTitle } from 'tools/pageHeaderTitle';

export class VStructure extends VPage<CProduct> {

    init() {
        
    }

    header() { return "";}

    content() { return <this.contentView />}

    callStructureSearchs = () => {
        window.callStructureSearch();
    }

    private contentView = observer(() => {
        return <div className="mb-5">
            {pageHTitle(<div className="text-left">结构式搜索</div>)}
            {/* 本地测试 在项目public中添加drawmoleculeGWT */}
            <div style={{}} className="alert alert-warning"> <b>使用提示</b> <br />
                1.画板元素位置显示“Xx”字样时,可在画板右侧选择元素,需双击元素;
            </div>
            {/* <iframe className="mx-auto" id="drawmolecule" src="/drawmoleculeGWT/Drawmolecule.html" width="1014" height="405" scrolling="no">
                <script src='/drawmoleculeGWT/drawmolecule/drawmolecule.nocache.js'></script>
            </iframe> */}
            {/* 发布使用 */}
            <iframe id="drawmolecule" src="https://test.jkchemical.com/drawmoleculeGWT" width="1014" height="405" scrolling="no">
                <script src='https://test.jkchemical.com/drawmoleculeGWT/drawmolecule/drawmolecule.nocache.js'></script>
            </iframe>
            <div><button onClick={() => { this.callStructureSearchs() }}
                style={{border:"none"}} type="button" className="rounded btn-secondary px-3 py-1" >结构式查询</button></div>
            <div className="h4 my-4 mb-3 pl-2" style={{borderLeft:"5px solid #DD9222"}}>查询结果</div>
            <div id="moleculeCanvases" className="row mx-0">
                <div className="w-100 py-2 text-center rounded-sm border text-muted" >暂无内容</div>
            </div>
        </div>
    })
}