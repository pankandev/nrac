import { S as SvelteComponent, i as init, s as safe_not_equal, k as element, a as space, q as text, K as head_selector, l as claim_element, h as detach, c as claim_space, m as children, r as claim_text, n as attr, D as src_url_equal, E as append_hydration, b as insert_hydration, L as set_input_value, M as listen, C as noop } from "../../chunks/index-b3efc94e.js";
const home = "";
function create_if_block(ctx) {
  let a;
  let t;
  let a_href_value;
  return {
    c() {
      a = element("a");
      t = text("Enroll");
      this.h();
    },
    l(nodes) {
      a = claim_element(nodes, "A", { class: true, href: true });
      var a_nodes = children(a);
      t = claim_text(a_nodes, "Enroll");
      a_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(a, "class", "playlist-select-button");
      attr(a, "href", a_href_value = "/class?list=" + /*playlistId*/
      ctx[1]);
    },
    m(target, anchor) {
      insert_hydration(target, a, anchor);
      append_hydration(a, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*playlistId*/
      2 && a_href_value !== (a_href_value = "/class?list=" + /*playlistId*/
      ctx2[1])) {
        attr(a, "href", a_href_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(a);
    }
  };
}
function create_fragment(ctx) {
  let meta;
  let t0;
  let section;
  let img;
  let img_src_value;
  let t1;
  let label;
  let t2;
  let t3;
  let input;
  let t4;
  let mounted;
  let dispose;
  let if_block = (
    /*playlistId*/
    ctx[1] && create_if_block(ctx)
  );
  return {
    c() {
      meta = element("meta");
      t0 = space();
      section = element("section");
      img = element("img");
      t1 = space();
      label = element("label");
      t2 = text("Enter a YouTube playlist URL to get started.");
      t3 = space();
      input = element("input");
      t4 = space();
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      const head_nodes = head_selector("svelte-1c5iw76", document.head);
      meta = claim_element(head_nodes, "META", { name: true, content: true });
      head_nodes.forEach(detach);
      t0 = claim_space(nodes);
      section = claim_element(nodes, "SECTION", { class: true });
      var section_nodes = children(section);
      img = claim_element(section_nodes, "IMG", { src: true, alt: true, class: true });
      t1 = claim_space(section_nodes);
      label = claim_element(section_nodes, "LABEL", { for: true });
      var label_nodes = children(label);
      t2 = claim_text(label_nodes, "Enter a YouTube playlist URL to get started.");
      label_nodes.forEach(detach);
      t3 = claim_space(section_nodes);
      input = claim_element(section_nodes, "INPUT", {
        id: true,
        class: true,
        type: true,
        placeholder: true
      });
      t4 = claim_space(section_nodes);
      if (if_block)
        if_block.l(section_nodes);
      section_nodes.forEach(detach);
      this.h();
    },
    h() {
      document.title = "Open Academy";
      attr(meta, "name", "description");
      attr(meta, "content", "Open Academy is a free, open-source platform for online learning.");
      if (!src_url_equal(img.src, img_src_value = "/images/logo.svg"))
        attr(img, "src", img_src_value);
      attr(img, "alt", "Logo");
      attr(img, "class", "w-32 mb-10");
      attr(label, "for", "playlist-select-input");
      attr(input, "id", "playlist-select-input");
      attr(input, "class", "playlist-select-input");
      attr(input, "type", "text");
      attr(input, "placeholder", "Enter a YouTube playlist URL");
      attr(section, "class", "playlist-select p-10 flex flex-col items-center justify-center h-full");
    },
    m(target, anchor) {
      append_hydration(document.head, meta);
      insert_hydration(target, t0, anchor);
      insert_hydration(target, section, anchor);
      append_hydration(section, img);
      append_hydration(section, t1);
      append_hydration(section, label);
      append_hydration(label, t2);
      append_hydration(section, t3);
      append_hydration(section, input);
      set_input_value(
        input,
        /*url*/
        ctx[0]
      );
      append_hydration(section, t4);
      if (if_block)
        if_block.m(section, null);
      if (!mounted) {
        dispose = listen(
          input,
          "input",
          /*input_input_handler*/
          ctx[2]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*url*/
      1 && input.value !== /*url*/
      ctx2[0]) {
        set_input_value(
          input,
          /*url*/
          ctx2[0]
        );
      }
      if (
        /*playlistId*/
        ctx2[1]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block(ctx2);
          if_block.c();
          if_block.m(section, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      detach(meta);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(section);
      if (if_block)
        if_block.d();
      mounted = false;
      dispose();
    }
  };
}
function getUrlPlaylistId(rawUrl) {
  let url2;
  try {
    url2 = new URL(rawUrl);
  } catch (e) {
    return null;
  }
  const urlParams = new URLSearchParams(url2.search);
  return urlParams.get("list");
}
function instance($$self, $$props, $$invalidate) {
  let playlistId;
  let url = "";
  function input_input_handler() {
    url = this.value;
    $$invalidate(0, url);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*url*/
    1) {
      $$invalidate(1, playlistId = getUrlPlaylistId(url));
    }
  };
  return [url, playlistId, input_input_handler];
}
class Page extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export {
  Page as default
};
