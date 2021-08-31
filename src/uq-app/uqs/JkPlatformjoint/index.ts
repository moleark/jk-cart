import { UqExt as Uq } from './JkPlatformjoint';
import * as Platform from './Platform.ui';
import * as City from './City.ui';
import * as County from './County.ui';
import * as Province from './Province.ui';
import * as JDCity from './JDCity.ui';
import * as JDCounty from './JDCounty.ui';
import * as JDTown from './JDTown.ui';
import * as JDProvince from './JDProvince.ui';
import * as PlatformCustomer from './PlatformCustomer.ui';
import * as Customer from './Customer.ui';
import * as EpecProvince from './EpecProvince.ui';
import * as EpecCity from './EpecCity.ui';
import * as EpecCounty from './EpecCounty.ui';
import * as WebUser from './WebUser.ui';
import * as EpecMessage from './EpecMessage.ui';
import * as EpecMessageData from './EpecMessageData.ui';
import * as ApiRawContent from './ApiRawContent.ui';
import * as ExpressLogistics from './ExpressLogistics.ui';
import * as PunchoutSetupRequest from './PunchoutSetupRequest.ui';
import * as Organization from './Organization.ui';
import * as PlatformCustomers from './PlatformCustomers.ui';
import * as Message from './Message.ui';

function assign(uq:Uq, to:string, from:any): void {
	try {
		Object.assign((uq as any)[to], from);
	}
	catch {}
}
	
export function setUI(uq: Uq) {
	assign(uq, 'Platform', Platform);
	assign(uq, 'City', City);
	assign(uq, 'County', County);
	assign(uq, 'Province', Province);
	assign(uq, 'JDCity', JDCity);
	assign(uq, 'JDCounty', JDCounty);
	assign(uq, 'JDTown', JDTown);
	assign(uq, 'JDProvince', JDProvince);
	assign(uq, 'PlatformCustomer', PlatformCustomer);
	assign(uq, 'Customer', Customer);
	assign(uq, 'EpecProvince', EpecProvince);
	assign(uq, 'EpecCity', EpecCity);
	assign(uq, 'EpecCounty', EpecCounty);
	assign(uq, 'WebUser', WebUser);
	assign(uq, 'EpecMessage', EpecMessage);
	assign(uq, 'EpecMessageData', EpecMessageData);
	assign(uq, 'ApiRawContent', ApiRawContent);
	assign(uq, 'ExpressLogistics', ExpressLogistics);
	assign(uq, 'PunchoutSetupRequest', PunchoutSetupRequest);
	assign(uq, 'Organization', Organization);
	assign(uq, 'PlatformCustomers', PlatformCustomers);
	assign(uq, 'Message', Message);
}
export * from './JkPlatformjoint';
