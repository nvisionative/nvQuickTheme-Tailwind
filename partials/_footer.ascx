<footer>
  <div class="bg-light-grey">
    <div class="container">
      <div class="flex flex-col md:flex-row p-4 gap-4">
          <div class="flex-1" id="FooterPaneA" runat="server"></div>
          <div class="flex-1" id="FooterPaneB" runat="server"></div>
      </div>
    </div>
  </div>
  <div class="bg-dnn-red text-white">
    <div class="container py-2">
      <div class="flex flex-row justify-center gap-4 divide-white divide-solid divide-x">
        <div><dnn:COPYRIGHT id="dnnCopyright" runat="server" /></div>
        <div><dnn:TERMS id="dnnTerms" Text="Terms" runat="server" /></div>
        <div><dnn:PRIVACY id="dnnPrivacy" Text="Privacy" runat="server" /></div>
      </div>
    </div>
  </div>
</footer>
<dnn:Login runat="server" id="dnnHiddenLogin" CssClass="hiddenLogin" />