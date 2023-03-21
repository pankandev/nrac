import { S as SvelteComponent, i as init, s as safe_not_equal, k as element, l as claim_element, m as children, h as detach, n as attr, D as src_url_equal, b as insert_hydration, E as append_hydration, C as noop, F as create_slot, x as create_component, a as space, y as claim_component, c as claim_space, z as mount_component, G as update_slot_base, H as get_all_dirty_from_scope, I as get_slot_changes, f as transition_in, t as transition_out, A as destroy_component } from "../../chunks/index-b3efc94e.js";
const header = "";
function create_fragment$1(ctx) {
  let header2;
  let div;
  let a;
  let img;
  let img_src_value;
  return {
    c() {
      header2 = element("header");
      div = element("div");
      a = element("a");
      img = element("img");
      this.h();
    },
    l(nodes) {
      header2 = claim_element(nodes, "HEADER", {});
      var header_nodes = children(header2);
      div = claim_element(header_nodes, "DIV", { class: true });
      var div_nodes = children(div);
      a = claim_element(div_nodes, "A", { class: true, href: true });
      var a_nodes = children(a);
      img = claim_element(a_nodes, "IMG", { class: true, src: true, alt: true });
      a_nodes.forEach(detach);
      div_nodes.forEach(detach);
      header_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(img, "class", "logo");
      if (!src_url_equal(img.src, img_src_value = "/images/logo.svg"))
        attr(img, "src", img_src_value);
      attr(img, "alt", "logo");
      attr(a, "class", "home-btn");
      attr(a, "href", "/");
      attr(div, "class", "toolbar");
    },
    m(target, anchor) {
      insert_hydration(target, header2, anchor);
      append_hydration(header2, div);
      append_hydration(div, a);
      append_hydration(a, img);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(header2);
    }
  };
}
class Header extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$1, safe_not_equal, {});
  }
}
const app = "";
function create_fragment(ctx) {
  let div;
  let header2;
  let t0;
  let main;
  let t1;
  let footer;
  let current;
  header2 = new Header({});
  const default_slot_template = (
    /*#slots*/
    ctx[1].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[0],
    null
  );
  return {
    c() {
      div = element("div");
      create_component(header2.$$.fragment);
      t0 = space();
      main = element("main");
      if (default_slot)
        default_slot.c();
      t1 = space();
      footer = element("footer");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(header2.$$.fragment, div_nodes);
      t0 = claim_space(div_nodes);
      main = claim_element(div_nodes, "MAIN", {});
      var main_nodes = children(main);
      if (default_slot)
        default_slot.l(main_nodes);
      main_nodes.forEach(detach);
      t1 = claim_space(div_nodes);
      footer = claim_element(div_nodes, "FOOTER", {});
      var footer_nodes = children(footer);
      footer_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "app");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(header2, div, null);
      append_hydration(div, t0);
      append_hydration(div, main);
      if (default_slot) {
        default_slot.m(main, null);
      }
      append_hydration(div, t1);
      append_hydration(div, footer);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        1)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[0],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[0]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[0],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(header2.$$.fragment, local);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(header2.$$.fragment, local);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(header2);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(0, $$scope = $$props2.$$scope);
  };
  return [$$scope, slots];
}
class Layout extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export {
  Layout as default
};
