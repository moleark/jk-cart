import { UqExt as Uq } from './JkWebBuilder';
import * as Tag from './Tag.ui';
import * as Template from './Template.ui';
import * as Content from './Content.ui';
import * as POST from './POST.ui';
import * as IMAGE from './IMAGE.ui';
import * as BRANCH from './BRANCH.ui';
import * as WebPage from './WebPage.ui';
import * as Ip from './Ip.ui';
import * as Brand from './Brand.ui';
import * as ProductX from './ProductX.ui';
import * as ProductCategory from './ProductCategory.ui';
import * as Subject from './Subject.ui';
import * as IMGCat from './IMGCat.ui';
import * as BusinessScope from './BusinessScope.ui';
import * as ClassroomType from './ClassroomType.ui';
import * as Domain from './Domain.ui';
import * as Website from './Website.ui';
import * as MadiaType from './MadiaType.ui';

function assign(uq:Uq, to:string, from:any): void {
	try {
		Object.assign((uq as any)[to], from);
	}
	catch {}
}
	
export function setUI(uq: Uq) {
	assign(uq, 'Tag', Tag);
	assign(uq, 'Template', Template);
	assign(uq, 'Content', Content);
	assign(uq, 'POST', POST);
	assign(uq, 'IMAGE', IMAGE);
	assign(uq, 'BRANCH', BRANCH);
	assign(uq, 'WebPage', WebPage);
	assign(uq, 'Ip', Ip);
	assign(uq, 'Brand', Brand);
	assign(uq, 'ProductX', ProductX);
	assign(uq, 'ProductCategory', ProductCategory);
	assign(uq, 'Subject', Subject);
	assign(uq, 'IMGCat', IMGCat);
	assign(uq, 'BusinessScope', BusinessScope);
	assign(uq, 'ClassroomType', ClassroomType);
	assign(uq, 'Domain', Domain);
	assign(uq, 'Website', Website);
	assign(uq, 'MadiaType', MadiaType);
}
export * from './JkWebBuilder';
