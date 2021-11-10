import { UqExt as Uq, assign } from './JkDeliver';
import * as Carrier from './Carrier.ui';
import * as OrderMain from './OrderMain.ui';
import * as OrderDetail from './OrderDetail.ui';
import * as Warehouse from './Warehouse.ui';
import * as DeliverMain from './DeliverMain.ui';
import * as DeliverDetail from './DeliverDetail.ui';
import * as DeliverMainEx from './DeliverMainEx.ui';
import * as CutOffMain from './CutOffMain.ui';
import * as CutOffType from './CutOffType.ui';
import * as DeliverType from './DeliverType.ui';
import * as RequestDetail from './RequestDetail.ui';
import * as Request from './Request.ui';
import * as InsuredInterval from './InsuredInterval.ui';
import * as InsuredType from './InsuredType.ui';
import * as TruckDetail from './TruckDetail.ui';
import * as TruckMain from './TruckMain.ui';
import * as TruckAdditionalTask from './TruckAdditionalTask.ui';
import * as Role from './Role.ui';
import * as DxDeliverMain from './DxDeliverMain.ui';
import * as DxDeliverDetail from './DxDeliverDetail.ui';
import * as DxCutOffMain from './DxCutOffMain.ui';
import * as DxDelivering from './DxDelivering.ui';
import * as Talling from './Talling.ui';
import * as IxPendingRequest from './IxPendingRequest.ui';
import * as DxCutOffTypeBuyerAccount from './DxCutOffTypeBuyerAccount.ui';
import * as DxTruckMain from './DxTruckMain.ui';
import * as DxTrucking from './DxTrucking.ui';
import * as IxUserWarehouse from './IxUserWarehouse.ui';
import * as IxCutoffTypeDefinition from './IxCutoffTypeDefinition.ui';
import * as CutOffProcessing from './CutOffProcessing.ui';
import * as DeliverDetailExchangeDetail from './DeliverDetailExchangeDetail.ui';
import * as DeliverDetailOrderDetail from './DeliverDetailOrderDetail.ui';
import * as InsuredTypeBrand from './InsuredTypeBrand.ui';
import * as InsuredTypeInterval from './InsuredTypeInterval.ui';
import * as IxPendingTruck from './IxPendingTruck.ui';
import * as RoleOps from './RoleOps.ui';
import * as UserRole from './UserRole.ui';
	
export function setUI(uq: Uq) {
	assign(uq, 'Carrier', Carrier);
	assign(uq, 'OrderMain', OrderMain);
	assign(uq, 'OrderDetail', OrderDetail);
	assign(uq, 'Warehouse', Warehouse);
	assign(uq, 'DeliverMain', DeliverMain);
	assign(uq, 'DeliverDetail', DeliverDetail);
	assign(uq, 'DeliverMainEx', DeliverMainEx);
	assign(uq, 'CutOffMain', CutOffMain);
	assign(uq, 'CutOffType', CutOffType);
	assign(uq, 'DeliverType', DeliverType);
	assign(uq, 'RequestDetail', RequestDetail);
	assign(uq, 'Request', Request);
	assign(uq, 'InsuredInterval', InsuredInterval);
	assign(uq, 'InsuredType', InsuredType);
	assign(uq, 'TruckDetail', TruckDetail);
	assign(uq, 'TruckMain', TruckMain);
	assign(uq, 'TruckAdditionalTask', TruckAdditionalTask);
	assign(uq, 'Role', Role);
	assign(uq, 'DxDeliverMain', DxDeliverMain);
	assign(uq, 'DxDeliverDetail', DxDeliverDetail);
	assign(uq, 'DxCutOffMain', DxCutOffMain);
	assign(uq, 'DxDelivering', DxDelivering);
	assign(uq, 'Talling', Talling);
	assign(uq, 'IxPendingRequest', IxPendingRequest);
	assign(uq, 'DxCutOffTypeBuyerAccount', DxCutOffTypeBuyerAccount);
	assign(uq, 'DxTruckMain', DxTruckMain);
	assign(uq, 'DxTrucking', DxTrucking);
	assign(uq, 'IxUserWarehouse', IxUserWarehouse);
	assign(uq, 'IxCutoffTypeDefinition', IxCutoffTypeDefinition);
	assign(uq, 'CutOffProcessing', CutOffProcessing);
	assign(uq, 'DeliverDetailExchangeDetail', DeliverDetailExchangeDetail);
	assign(uq, 'DeliverDetailOrderDetail', DeliverDetailOrderDetail);
	assign(uq, 'InsuredTypeBrand', InsuredTypeBrand);
	assign(uq, 'InsuredTypeInterval', InsuredTypeInterval);
	assign(uq, 'IxPendingTruck', IxPendingTruck);
	assign(uq, 'RoleOps', RoleOps);
	assign(uq, 'UserRole', UserRole);
}
export * from './JkDeliver';
