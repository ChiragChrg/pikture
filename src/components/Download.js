import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Download = () => {
  const { state } = useLocation();
  var Url = state.urls.regular;
  var Alt = state.alt_description;
  var Id = state.id;
  var Full = {};
  var Raw = {};
  var Regular = {};
  var Small = {};

  useEffect(() => {
    const RunOnload = async () => {
      Full = await GetUrl("full");
      Raw = await GetUrl("raw");
      Regular = await GetUrl("regular");
      Small = await GetUrl("small");

      const DwnloadLink = document.querySelector(".downloadLink");
      const Loader = document.querySelector(".loader");
      Loader.style.display = "none";

      if (window.innerWidth < 395) {
        DwnloadLink.style.display = "grid";
      } else DwnloadLink.style.display = "flex";

      const FullBtn = document.querySelector("#dwnBtn1");
      const RawBtn = document.querySelector("#dwnBtn2");
      const RegularBtn = document.querySelector("#dwnBtn3");
      const SmallBtn = document.querySelector("#dwnBtn4");

      FullBtn.innerHTML = `<i class="fad fa-download"></i> <span>Full</span> (${Full.sizeMB})`;
      RawBtn.innerHTML = `<i class="fad fa-download"></i> <span>Raw</span> (${Raw.sizeMB})`;
      RegularBtn.innerHTML = `<i class="fad fa-download"></i> <span>Regular</span> (${Regular.sizeMB})`;
      SmallBtn.innerHTML = `<i class="fad fa-download"></i> <span>Small</span> (${Small.sizeMB})`;
    };
    RunOnload();
  }, []);

  const GetUrl = async (res) => {
    if (res === "full") {
      var fetchUrl = state.urls.full;
    } else if (res === "raw") {
      fetchUrl = state.urls.raw;
    } else if (res === "regular") {
      fetchUrl = state.urls.regular;
    } else if (res === "small") {
      fetchUrl = state.urls.small;
    }

    var Img = await fetch(fetchUrl);
    var ImgBlob = await Img.blob();
    var Url = URL.createObjectURL(ImgBlob);
    var sizeByte = ImgBlob.size;
    var sizeMB = (sizeByte / (1024 * 1024)).toFixed(2) + " MB";

    var ImgData = { Url: Url, sizeMB: sizeMB };
    return ImgData;
  };

  const Downloader = async (size) => {
    var imageURL = "";
    switch (size) {
      case "Full":
        imageURL = Full.Url;
        break;
      case "Raw":
        imageURL = Raw.Url;
        break;
      case "Regular":
        imageURL = Regular.Url;
        break;
      case "Small":
        imageURL = Small.Url;
        break;
      default:
        console.log("Error");
    }

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = Id + ".jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <div className="Preview">
        <div className="ImgaePreview">
          <img src={Url} alt={Alt} />
        </div>

        <div className="download">
          <p>Downloads</p>

          <div className="loader">
            <i className="fad fa-spinner-third fa-3x"></i>
          </div>

          <div className="downloadLink" style={{ display: "none" }}>
            <button id="dwnBtn1" onClick={() => Downloader("Full")}>
              Full
            </button>
            <button id="dwnBtn2" onClick={() => Downloader("Raw")}>
              Raw
            </button>
            <button id="dwnBtn3" onClick={() => Downloader("Regular")}>
              Regular
            </button>
            <button id="dwnBtn4" onClick={() => Downloader("Small")}>
              Small
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
