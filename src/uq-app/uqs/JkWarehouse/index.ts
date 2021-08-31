import { UqExt as Uq } from './JkWarehouse';
import * as SalesRegion from './SalesRegion.ui';
import * as Address from './Address.ui';
import * as Country from './Country.ui';
import * as Province from './Province.ui';
import * as City from './City.ui';
import * as County from './County.ui';
import * as Currency from './Currency.ui';
import * as Brand from './Brand.ui';
import * as ProductX from './ProductX.ui';
import * as ShippingArea from './ShippingArea.ui';
import * as Warehouse from './Warehouse.ui';
import * as WarehouseRoom from './WarehouseRoom.ui';
import * as ShelfLayer from './ShelfLayer.ui';
import * as Shelf from './Shelf.ui';
import * as ShelfBlock from './ShelfBlock.ui';
import * as StorageCondition from './StorageCondition.ui';
import * as WarehouseStorageCondition from './WarehouseStorageCondition.ui';
import * as ExpressLogistics from './ExpressLogistics.ui';
import * as OutInBoundOrder from './OutInBoundOrder.ui';
import * as OutInBoundReason from './OutInBoundReason.ui';
import * as WebUser from './WebUser.ui';
import * as StorePoint from './StorePoint.ui';
import * as Item from './Item.ui';
import * as Section from './Section.ui';
import * as OrderMain from './OrderMain.ui';
import * as Pickup from './Pickup.ui';
import * as OrderDetail from './OrderDetail.ui';
import * as WarehouseN from './WarehouseN.ui';
import * as PickupDetail from './PickupDetail.ui';
import * as ItemResearch from './ItemResearch.ui';
import * as ItemProductPack from './ItemProductPack.ui';
import * as ItemProductPackLot from './ItemProductPackLot.ui';
import * as TallyDetail from './TallyDetail.ui';
import * as TallyMain from './TallyMain.ui';
import * as Contact from './Contact.ui';
import * as DxPicking from './DxPicking.ui';
import * as OrderDetailX from './OrderDetailX.ui';
import * as DxTallyMain from './DxTallyMain.ui';
import * as WarehouseSection from './WarehouseSection.ui';
import * as ItemStore from './ItemStore.ui';
import * as IxUserWarehouse from './IxUserWarehouse.ui';
import * as IxPendingPickup from './IxPendingPickup.ui';

function assign(uq:Uq, to:string, from:any): void {
	try {
		Object.assign((uq as any)[to], from);
	}
	catch {}
}
	
export function setUI(uq: Uq) {
	assign(uq, 'SalesRegion', SalesRegion);
	assign(uq, 'Address', Address);
	assign(uq, 'Country', Country);
	assign(uq, 'Province', Province);
	assign(uq, 'City', City);
	assign(uq, 'County', County);
	assign(uq, 'Currency', Currency);
	assign(uq, 'Brand', Brand);
	assign(uq, 'ProductX', ProductX);
	assign(uq, 'ShippingArea', ShippingArea);
	assign(uq, 'Warehouse', Warehouse);
	assign(uq, 'WarehouseRoom', WarehouseRoom);
	assign(uq, 'ShelfLayer', ShelfLayer);
	assign(uq, 'Shelf', Shelf);
	assign(uq, 'ShelfBlock', ShelfBlock);
	assign(uq, 'StorageCondition', StorageCondition);
	assign(uq, 'WarehouseStorageCondition', WarehouseStorageCondition);
	assign(uq, 'ExpressLogistics', ExpressLogistics);
	assign(uq, 'OutInBoundOrder', OutInBoundOrder);
	assign(uq, 'OutInBoundReason', OutInBoundReason);
	assign(uq, 'WebUser', WebUser);
	assign(uq, 'StorePoint', StorePoint);
	assign(uq, 'Item', Item);
	assign(uq, 'Section', Section);
	assign(uq, 'OrderMain', OrderMain);
	assign(uq, 'Pickup', Pickup);
	assign(uq, 'OrderDetail', OrderDetail);
	assign(uq, 'WarehouseN', WarehouseN);
	assign(uq, 'PickupDetail', PickupDetail);
	assign(uq, 'ItemResearch', ItemResearch);
	assign(uq, 'ItemProductPack', ItemProductPack);
	assign(uq, 'ItemProductPackLot', ItemProductPackLot);
	assign(uq, 'TallyDetail', TallyDetail);
	assign(uq, 'TallyMain', TallyMain);
	assign(uq, 'Contact', Contact);
	assign(uq, 'DxPicking', DxPicking);
	assign(uq, 'OrderDetailX', OrderDetailX);
	assign(uq, 'DxTallyMain', DxTallyMain);
	assign(uq, 'WarehouseSection', WarehouseSection);
	assign(uq, 'ItemStore', ItemStore);
	assign(uq, 'IxUserWarehouse', IxUserWarehouse);
	assign(uq, 'IxPendingPickup', IxPendingPickup);
}
export * from './JkWarehouse';
