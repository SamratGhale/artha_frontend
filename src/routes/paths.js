//used in this file to merge merge_path and submerge_path
function merge_path(base, submerge_path){
    return `${base}${submerge_path}`
}

export const ROOTS={
    auth     :'/auth',
    app      :'/app',
    admin    :'/admin',
    error    :'/error'
};

export const PATH_HOME={
    app: ROOTS.app
};

export const PATH_PAGE = {
    auth: {
      login           : merge_path(ROOTS.auth, '/login'),
      signup          : merge_path(ROOTS.auth, '/signup'),
      waitForApprove  : merge_path(ROOTS.auth, '/waitforapprove'),
      resetPassword   : merge_path(ROOTS.auth, '/reset-password'),
    },
    comingSoon: '/coming-soon'
  };
  
  export const PATH_APP = {
    root: ROOTS.app,
    app:
    {
      item_detail     : merge_path(ROOTS.app, '/items/:id'),
      analytics       : merge_path(ROOTS.app, '/analytics'),
      inventory       : merge_path(ROOTS.app, '/items'),
      customers       : merge_path(ROOTS.app, '/customers'),
      customer_details: merge_path(ROOTS.app, '/customers/:id'),
    },
    admin: 
    {
      inventory    :merge_path(ROOTS.admin, '/items/'),
      invoices     :merge_path(ROOTS.admin, '/invoices/'),
      item_add     :merge_path(ROOTS.admin, '/items/add'),
      item_detail  :merge_path(ROOTS.admin, '/items/'),
      dashboard    :merge_path(ROOTS.admin, '/dashboard'),
      staffs       :merge_path(ROOTS.admin, '/staffs'),
      staff_details:merge_path(ROOTS.admin, '/staff/:id'),
      add          :merge_path(ROOTS.admin, '/items/add')
    },
  };