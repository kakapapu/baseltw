

export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/todo-list',
		name: 'TodoList',
		icon: 'OrderedListOutlined',
		component: './TodoList',
	},
	{
		path: '/bai-tap-01',
		name: 'BaiTap01',
		icon: 'ShoppingCartOutlined',
		component: './BaiTap01',
	},
	{
		path: '/thuc-hanh-01',
		name: 'ThucHanh01',
		icon: 'ExperimentOutlined',
		routes: [
			{
				path: '/thuc-hanh-01/bt01',
				name: 'BaiTap01',
				component: './TH01/BT01/Randnum',
			}
			// {
			// 	path: '/thuc-hanh-01/bt02',
			// 	name: 'BaiTap02',
			// 	component: './TH01/BT02/index',
			// },
		],
	},
	{
		path: '/thuc-hanh-02',
		name: 'ThucHanh02',
		icon: 'ExperimentOutlined',
		component: './TH02',
		routes: [
			{
				path: '/thuc-hanh-02/bt01',
				name: 'BaiTap01',
				component: './TH02/BT01/Game',
			},
			// {
			// 	path: '/thuc-hanh-02/bt02',
			// 	name: 'BaiTap02',
			// 	component: './TH02/BT02/system',
			// }
		],
	},
	{
		path: '/thuc-hanh-03',
		name: 'ThucHanh03',
		icon: 'ExperimentOutlined',
		component: './TH03',
		
	},
	{
		path: '/thuc-hanh-04',
		name: 'ThucHanh04',
		icon: 'ExperimentOutlined',
		component: './TH04',
	},
	{
		path: '/thuc-hanh-05',
		name: 'ThucHanh05',
		icon: 'ExperimentOutlined',
		component: './TH05',
	},
	{
		path: '/thuc-hanh-06',
		name: 'ThucHanh06',
		icon: 'ExperimentOutlined',
		component: './TH06',
	},
	{
		path: '/kt-gk',
		name: 'KTGK',
		icon: 'ExperimentOutlined',
		component: './KTGK',
	},
	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
