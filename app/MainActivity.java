package com.kagami.merusuto;

import android.app.Activity;
import android.app.ActionBar;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.SubMenu;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.BaseAdapter;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.PopupMenu;
import android.widget.SearchView;
import android.widget.TextView;
import android.support.v4.app.ActionBarDrawerToggle;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;

import java.util.ArrayList;
import java.util.TreeSet;

public class MainActivity extends Activity {

  public final static int ID_TEMPLATE_UNIT = 1;
  public final static int ID_TEMPLATE_MONSTER = 2;
  public final static int ID_LOAD_ZIP_DATA = 4;

  public final static int ID_COUNTRY_MENU_GROUP = 1;

  private UnitListFragment mUnitListFragment;
  private ActionBarDrawerToggle mDrawerToggle;
  private MenuItem mSearchMenu, mCountryFilter;
  private ArrayList<String> mCountries;
  private boolean mCountryFilterUpdated = false;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    setContentView(R.layout.activity_main);
    ActionBar actionBar = getActionBar();
    // actionBar.setDisplayShowHomeEnabled(true);
    actionBar.setDisplayShowTitleEnabled(false);
    actionBar.setDisplayHomeAsUpEnabled(true);
    actionBar.setHomeButtonEnabled(true);
    // actionBar.setIcon(R.drawable.ic_logo);

    final ListView drawerList = (ListView) findViewById(R.id.left_drawer);

    DrawerListAdapter adapter = new DrawerListAdapter(this);
    PopupMenu popupMenu = new PopupMenu(this, null);
    popupMenu.inflate(R.menu.sidebar);
    Menu menu = popupMenu.getMenu();
    MenuItem menuItem;
    for (int i = 0; i < menu.size(); i++) {
      menuItem = menu.getItem(i);
      adapter.addItem(new DrawerItem(menuItem.getItemId(),
        menuItem.getTitle(), true));
      SubMenu subMenu = menuItem.getSubMenu();
      for (int j = 0; j < subMenu.size(); j++) {
        menuItem = subMenu.getItem(j);
        adapter.addItem(new DrawerItem(menuItem.getItemId(),
          menuItem.getTitle(), false));
      }
    }

    final DrawerLayout drawerLayout = (DrawerLayout) findViewById(R.id.drawer_layout);
    drawerLayout.setDrawerShadow(R.drawable.drawer_shadow, GravityCompat.START);

    drawerList.setAdapter(adapter);
    drawerList.setOnItemClickListener(new ListView.OnItemClickListener() {

      @Override
      public void onItemClick(AdapterView parent, View view, int position, long id) {
        drawerLayout.closeDrawer(drawerList);

        switch (position) {
        case ID_TEMPLATE_UNIT:
          mUnitListFragment.setTemplate(UnitListFragment.TEMPLATE_UNIT);
          invalidateOptionsMenu();
          break;
        case ID_TEMPLATE_MONSTER:
          mUnitListFragment.setTemplate(UnitListFragment.TEMPLATE_MONSTER);
          invalidateOptionsMenu();
          break;
        case ID_LOAD_ZIP_DATA:
          Intent intent = new Intent();
          intent.setAction(Intent.ACTION_GET_CONTENT);
          intent.setType("application/zip");
          startActivityForResult(intent, ID_LOAD_ZIP_DATA);
          break;
        }
      }
    });

    mDrawerToggle = new ActionBarDrawerToggle(this, drawerLayout,
      R.drawable.ic_drawer, R.string.drawer_open, R.string.drawer_close);

    drawerLayout.setDrawerListener(mDrawerToggle);

    if (savedInstanceState == null) {
      mUnitListFragment = new UnitListFragment();
      getFragmentManager().beginTransaction()
        .add(R.id.content_frame, mUnitListFragment, "UnitListFragment")
        .commit();
    } else {
      mUnitListFragment = (UnitListFragment) getFragmentManager()
        .findFragmentByTag("UnitListFragment");
    }
  }

  @Override
  protected void onPostCreate(Bundle savedInstanceState) {
    super.onPostCreate(savedInstanceState);
    mDrawerToggle.syncState();
  }

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    mDrawerToggle.onConfigurationChanged(newConfig);
  }

  @Override
  public boolean onCreateOptionsMenu(final Menu menu) {
    switch (mUnitListFragment.getTemplate()) {
    case UnitListFragment.TEMPLATE_UNIT:
      getMenuInflater().inflate(R.menu.options_unit, menu);
      break;
    case UnitListFragment.TEMPLATE_MONSTER:
      getMenuInflater().inflate(R.menu.options_monster, menu);
      break;
    }

    mCountryFilter = menu.findItem(R.id.menu_country);
    mCountryFilterUpdated = false;
    updateCountryFilters();

    mSearchMenu = menu.findItem(R.id.menu_search);
    mSearchMenu.setOnActionExpandListener(new MenuItem.OnActionExpandListener() {

      public void setMenuItemVisible(boolean visible) {
        MenuItem menuItem;
        menuItem = menu.findItem(R.id.menu_level_mode);
        if (menuItem != null) menuItem.setVisible(visible);
        menuItem = menu.findItem(R.id.menu_sort_mode);
        menuItem.setVisible(visible);
        menuItem = menu.findItem(R.id.menu_filters);
        menuItem.setVisible(visible);
        menuItem = menu.findItem(R.id.menu_close_search);
        menuItem.setVisible(!visible);
      }

      @Override
      public boolean onMenuItemActionCollapse(MenuItem item) {
        mUnitListFragment.setSearchQuery(null);
        setMenuItemVisible(true);
        return true;
      }

      @Override
      public boolean onMenuItemActionExpand(MenuItem item) {
        setMenuItemVisible(false);
        return true;
      }
    });

    SearchView searchView = (SearchView) mSearchMenu.getActionView();
    searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
      @Override
      public boolean onQueryTextChange(String query) {
        if (query.isEmpty()) query = null;
        mUnitListFragment.setSearchQuery(query);
        return true;
      }

      @Override
      public boolean onQueryTextSubmit(String query) {
        mUnitListFragment.setSearchQuery(query);
        return true;
      }
    });

    return true;
  }

  public void setCountries(ArrayList<String> countries) {
    mCountries = countries;
    updateCountryFilters();
  }

  public void updateCountryFilters() {
    if (!mCountryFilterUpdated && mCountries != null && mCountryFilter != null) {
      SubMenu subMenu = mCountryFilter.getSubMenu();
      for (int i = 0; i < mCountries.size(); i++) {
        subMenu.add(ID_COUNTRY_MENU_GROUP, i, Menu.NONE, mCountries.get(i));
      }
      mCountryFilterUpdated = true;
    }
  }

  @Override
  public boolean onOptionsItemSelected(MenuItem item) {
    if (mDrawerToggle.onOptionsItemSelected(item)) {
      return true;
    }

    if (item.getGroupId() == ID_COUNTRY_MENU_GROUP) {
      mUnitListFragment.setCountry(item.getTitle().toString());
    }

    switch (item.getItemId()) {
    case R.id.menu_close_search:
      mSearchMenu.collapseActionView();
      break;
    case R.id.menu_rare_0:
      mUnitListFragment.setRare(0);
      break;
    case R.id.menu_rare_1:
      mUnitListFragment.setRare(1);
      break;
    case R.id.menu_rare_2:
      mUnitListFragment.setRare(2);
      break;
    case R.id.menu_rare_3:
      mUnitListFragment.setRare(3);
      break;
    case R.id.menu_rare_4:
      mUnitListFragment.setRare(4);
      break;
    case R.id.menu_rare_5:
      mUnitListFragment.setRare(5);
      break;
    case R.id.menu_element_0:
      mUnitListFragment.setElement(0);
      break;
    case R.id.menu_element_1:
      mUnitListFragment.setElement(1);
      break;
    case R.id.menu_element_2:
      mUnitListFragment.setElement(2);
      break;
    case R.id.menu_element_3:
      mUnitListFragment.setElement(3);
      break;
    case R.id.menu_element_4:
      mUnitListFragment.setElement(4);
      break;
    case R.id.menu_element_5:
      mUnitListFragment.setElement(5);
      break;
    case R.id.menu_weapon_0:
      mUnitListFragment.setWeapon(0);
      break;
    case R.id.menu_weapon_1:
      mUnitListFragment.setWeapon(1);
      break;
    case R.id.menu_weapon_2:
      mUnitListFragment.setWeapon(2);
      break;
    case R.id.menu_weapon_3:
      mUnitListFragment.setWeapon(3);
      break;
    case R.id.menu_weapon_4:
      mUnitListFragment.setWeapon(4);
      break;
    case R.id.menu_weapon_5:
      mUnitListFragment.setWeapon(5);
      break;
    case R.id.menu_weapon_6:
      mUnitListFragment.setWeapon(6);
      break;
    case R.id.menu_weapon_7:
      mUnitListFragment.setWeapon(7);
      break;
    case R.id.menu_type_0:
      mUnitListFragment.setType(0);
      break;
    case R.id.menu_type_1:
      mUnitListFragment.setType(1);
      break;
    case R.id.menu_type_2:
      mUnitListFragment.setType(2);
      break;
    case R.id.menu_type_3:
      mUnitListFragment.setType(3);
      break;
    case R.id.menu_skin_0:
      mUnitListFragment.setSkin(0);
      break;
    case R.id.menu_skin_1:
      mUnitListFragment.setSkin(1);
      break;
    case R.id.menu_skin_2:
      mUnitListFragment.setSkin(2);
      break;
    case R.id.menu_skin_3:
      mUnitListFragment.setSkin(3);
      break;
    case R.id.menu_country_0:
      mUnitListFragment.setCountry(null);
      break;
    case R.id.menu_sort_rare:
      mUnitListFragment.setSortMode(UnitListFragment.SORT_RARE);
      break;
    case R.id.menu_sort_dps:
      mUnitListFragment.setSortMode(UnitListFragment.SORT_DPS);
      break;
    case R.id.menu_sort_mult_dps:
      mUnitListFragment.setSortMode(UnitListFragment.SORT_MULT_DPS);
      break;
    case R.id.menu_sort_life:
      mUnitListFragment.setSortMode(UnitListFragment.SORT_LIFE);
      break;
    case R.id.menu_sort_atk:
      mUnitListFragment.setSortMode(UnitListFragment.SORT_ATK);
      break;
    case R.id.menu_sort_aarea:
      mUnitListFragment.setSortMode(UnitListFragment.SORT_AAREA);
      break;
    case R.id.menu_sort_anum:
      mUnitListFragment.setSortMode(UnitListFragment.SORT_ANUM);
      break;
    case R.id.menu_sort_aspd:
      mUnitListFragment.setSortMode(UnitListFragment.SORT_ASPD);
      break;
    case R.id.menu_sort_tenacity:
      mUnitListFragment.setSortMode(UnitListFragment.SORT_TENACITY);
      break;
    case R.id.menu_sort_mspd:
      mUnitListFragment.setSortMode(UnitListFragment.SORT_MSPD);
      break;
    case R.id.menu_sort_id:
      mUnitListFragment.setSortMode(UnitListFragment.SORT_ID);
      break;
    case R.id.menu_level_zero:
      mUnitListFragment.setLevelMode(UnitListFragment.LEVEL_ZERO);
      break;
    case R.id.menu_level_max_lv:
      mUnitListFragment.setLevelMode(UnitListFragment.LEVEL_MAX_LV);
      break;
    case R.id.menu_level_max_lv_gr:
      mUnitListFragment.setLevelMode(UnitListFragment.LEVEL_MAX_LV_GR);
      break;
    case R.id.menu_reset:
      mUnitListFragment.reset();
      break;
    }

    return super.onOptionsItemSelected(item);
  }

  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    if (resultCode != Activity.RESULT_OK) {
      return;
    }

    switch (requestCode) {
    case ID_LOAD_ZIP_DATA:
      String filename = data.getData().getPath();
      Utils.createDecompressTask(this, filename);
      break;
    }
  }

  private class DrawerItem {

    public int id;
    public String title;
    public boolean separator = false;

    public DrawerItem(int id, CharSequence title, boolean separator) {
      this.id = id;
      this.title = title.toString();
      this.separator = separator;
    }
  }

  private class DrawerListAdapter extends BaseAdapter {

    private ArrayList<DrawerItem> mData = new ArrayList<DrawerItem>();

    private LayoutInflater mInflater;

    public DrawerListAdapter(Context context) {
      mInflater = (LayoutInflater) context
          .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
    }

    public void addItem(DrawerItem item) {
      mData.add(item);
      notifyDataSetChanged();
    }

    @Override
    public int getCount() {
      return mData.size();
    }

    @Override
    public DrawerItem getItem(int position) {
      return mData.get(position);
    }

    @Override
    public long getItemId(int position) {
      return mData.get(position).id;
    }

    public View getView(int position, View convertView, ViewGroup parent) {
      int rowType = getItemViewType(position);

      TextView textView = null;
      if (mData.get(position).separator) {
        convertView = mInflater.inflate(R.layout.drawer_listview_item_separator, null);
        textView = (TextView) convertView.findViewById(R.id.textSeparator);
      } else {
        convertView = mInflater.inflate(R.layout.drawer_listview_item, null);
        textView = (TextView) convertView.findViewById(R.id.text);
      }
      textView.setText(mData.get(position).title);

      return convertView;
    }
  }
}
