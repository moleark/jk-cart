import { UqExt as Uq } from './JkSalesTask';
import * as Customer from './Customer.ui';
import * as Organization from './Organization.ui';
import * as Employee from './Employee.ui';
import * as Brand from './Brand.ui';
import * as ProductX from './ProductX.ui';
import * as Task from './Task.ui';
import * as TaskType from './TaskType.ui';
import * as JkTaskType from './JkTaskType.ui';
import * as JkTask from './JkTask.ui';
import * as BizType from './BizType.ui';
import * as Field from './Field.ui';
import * as TaskStatus from './TaskStatus.ui';
import * as Project from './Project.ui';
import * as MyCustomer from './MyCustomer.ui';
import * as MyCustomerUnit from './MyCustomerUnit.ui';
import * as Message from './Message.ui';
import * as Coupon from './Coupon.ui';
import * as Address from './Address.ui';
import * as Country from './Country.ui';
import * as Province from './Province.ui';
import * as City from './City.ui';
import * as County from './County.ui';
import * as SalesRegion from './SalesRegion.ui';
import * as Currency from './Currency.ui';
import * as InvoiceType from './InvoiceType.ui';
import * as WithdrawalState from './WithdrawalState.ui';
import * as POST from './POST.ui';
import * as OfficePost from './OfficePost.ui';
import * as Department from './Department.ui';
import * as Research from './Research.ui';
import * as VIPCardType from './VIPCardType.ui';
import * as Domain from './Domain.ui';

function assign(uq:Uq, to:string, from:any): void {
	try {
		Object.assign((uq as any)[to], from);
	}
	catch {}
}
	
export function setUI(uq: Uq) {
	assign(uq, 'Customer', Customer);
	assign(uq, 'Organization', Organization);
	assign(uq, 'Employee', Employee);
	assign(uq, 'Brand', Brand);
	assign(uq, 'ProductX', ProductX);
	assign(uq, 'Task', Task);
	assign(uq, 'TaskType', TaskType);
	assign(uq, 'JkTaskType', JkTaskType);
	assign(uq, 'JkTask', JkTask);
	assign(uq, 'BizType', BizType);
	assign(uq, 'Field', Field);
	assign(uq, 'TaskStatus', TaskStatus);
	assign(uq, 'Project', Project);
	assign(uq, 'MyCustomer', MyCustomer);
	assign(uq, 'MyCustomerUnit', MyCustomerUnit);
	assign(uq, 'Message', Message);
	assign(uq, 'Coupon', Coupon);
	assign(uq, 'Address', Address);
	assign(uq, 'Country', Country);
	assign(uq, 'Province', Province);
	assign(uq, 'City', City);
	assign(uq, 'County', County);
	assign(uq, 'SalesRegion', SalesRegion);
	assign(uq, 'Currency', Currency);
	assign(uq, 'InvoiceType', InvoiceType);
	assign(uq, 'WithdrawalState', WithdrawalState);
	assign(uq, 'POST', POST);
	assign(uq, 'OfficePost', OfficePost);
	assign(uq, 'Department', Department);
	assign(uq, 'Research', Research);
	assign(uq, 'VIPCardType', VIPCardType);
	assign(uq, 'Domain', Domain);
}
export * from './JkSalesTask';
