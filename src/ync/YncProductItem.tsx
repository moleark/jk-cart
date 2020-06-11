//石科院项目接口返回结果
export class YncProjectsResponse {
    code: number;
    message: string;
    response: YncProjectsItem[];
}

export class YncProjectsItem {
    ID: number;
    ProjectName: string;
}

//石科院类别接口返回结果
export class YncCategorysResponse {
    code: number;
    message: string;
    response: YncCategorysItem[];
}

export class YncCategorysItem {
    ID: number;
    Name: string;
}

//石科院物料接口返回结果
export class YncMaterialgroupResponse {
    code: number;
    message: string;
    response: YncMaterialgroupItem[];
}

export class YncMaterialgroupItem {
    ID: number;
    Name: string;
}

//石科院实验室接口返回结果
export class YncLabsResponse {
    code: number;
    total: string;   //实验室数量
    rows: YncLabsItem[];  //实验室列表（ID，实验室ID；LabName，实验室名称）
}

export class YncLabsItem {
    ID: number;
    LabName: string;
}