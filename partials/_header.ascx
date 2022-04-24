<header class="sticky-top">
  <div class="bg-dnn-brown py-1">
    <div class="container">
      <div class="flex justify-end">
        <div class="flex list-unstyled align-middle mx-4">
          <div class="py-4"><dnn:Login runat="server" id="dnnLogin" /></div>
          <div class="py-4"><dnn:User runat="server" id="dnnUser" /></div>
          <div class="py-4"><dnn:Search runat="server" id="dnnSearch" ShowSite="false" ShowWeb="false" Submit="<i class='fas fa-search'></i>" /></div>
          <div class="py-4" style="display:none;"><dnn:Language runat="server" id="dnnLanguage" ShowMenu="false" ShowLinks="false" /></div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-light-grey">
    <div class="flex flex-col navbar-header">
      <dnn:LOGO id="dnnLOGO" runat="server" />
      <nav>
        <!--dnn:MENU Placeholder-->
      </nav>
    </div>
  </div>
</header>