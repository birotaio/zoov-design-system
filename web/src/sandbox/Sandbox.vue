<template lang="pug">
  z-app
    .sandbox
      .sandbox__title
        p.mb-0 Zoov Design System – {{ version }}
        h3 Sandbox

      //- Generic HTML elements and styles
      //----------------------------------------------------------------------------------------------------
      .sandbox__content
        h4 Elements and styles

        z-divider
        .sandbox__section
          h3.mb-2 Elements
          h1 Heading 1 (Display 3)
          h2 Heading 2 (Display 2)
          h3 Heading 3 (Display 1)
          h4 Heading 4 (Heading)
          h5 Heading 5 (Title)
          h6 Heading 6 (Subheader)
          input(value="Input (Subheader)")
          .spacer
          button Button (Button)
          p Paragraph (Body)
          ul
            li List (Body)
          label Label (Body)
          .spacer
          small Small (Caption)
          caption Caption (Caption)

        z-divider
        .sandbox__section
          h3.mb-2 Elevations
          .sandbox__flex
            .px-3.pt-4
              p.my-1.py-3(v-for="z in elevations") {{ 'elevation-' + z }}

            template(v-for="name in ['light', 'dark'].concat(colorList)")
              .ma-0
                p.my-1.text--center --{{ name }}
                .px-3.py-1(:class="name === 'light' ? 'neutral--light-4' : name === 'dark' ? 'neutral--dark-4' : name")
                  template(v-for="z in elevations")
                    z-card.my-4.px-5.py-3(:class="'elevation-' + z + '--' + name")

      //- Stateless components
      //----------------------------------------------------------------------------------------------------
      .sandbox__content
        h4 Stateless components

        z-divider
        .sandbox__section
          h3 ZIcon
          h6 List
          .sandbox__flex
            template(v-for="name in iconList")
              .sandbox__icon
                z-icon.mr-1 {{ name }}
                small {{ name }}

          h6.mt-1 Sizes and colors
          .sandbox__flex
            z-icon(:size="2") car
            z-icon car
            z-icon(:size="4") car
            z-icon(:size="5") car
            z-icon(size="57px") car
            z-icon(color="danger") heart-on
            template(v-for="name in colorList")
              z-icon(:color="name") {{ iconList[Math.floor(Math.random() * iconList.length)] }}

        z-divider
        .sandbox__section
          h3 ZButton
          h6 Shape and sizes
          .sandbox__flex
            template(v-for="size in buttonSizes")
              z-button(v-bind="size") click me

          .sandbox__flex
            template(v-for="size in buttonSizes")
              z-button(v-bind="size")
                z-icon archive
                span click me

          .sandbox__flex
            template(v-for="size in buttonSizes")
              z-button(v-bind="size")
                span click me
                z-icon copy

          .sandbox__flex
            template(v-for="size in buttonSizes")
              z-button(icon v-bind="size")
                z-icon heart
            template(v-for="size in buttonSizes")
              z-button(icon outline v-bind="size")
                z-icon filter
            template(v-for="size in buttonSizes")
              z-button(icon ghost v-bind="size")
                z-icon filter

          .sandbox__flex
            template(v-for="size in buttonSizes")
              z-button(outline v-bind="size")
                z-icon user-student
                span click me

          .sandbox__flex
            template(v-for="size in buttonSizes")
              z-button(ghost v-bind="size")
                z-icon flashcode
                span click me

          h6 Colors
          .sandbox__flex
            z-button click me
            z-button(color="primary--light-1") click me
            z-button(color="primary") click me
            z-button(color="danger")
              z-icon map-marker
              span click me
            z-button(color="success")
              span click me
              z-icon link
            z-button(color="info" dark-text)
              span click me
              z-icon tennis
            z-button(icon color="primary")
              z-icon traffic-light
            z-button(icon outline color="primary")
              z-icon traffic-light
            z-button(outline color="alt-blue")
              z-icon traffic-light
              span click me
            z-button(icon ghost color="alt-blue")
              z-icon birdie
            z-button(icon ghost color="alt-blue" hover-color="info")
              z-icon birdie

          h6 States
          .sandbox__flex
            z-button(disabled) Disabled
            z-button(loading) Loading

        z-divider
        .sandbox__section
          h3 ZDivider
          p Just see below or above this section. You can adjust height, and also use it's loading property to make it a linear indeterminate loader:
          z-divider(loading :height="0.5")

        z-divider
        .sandbox__section
          h3 ZLogo
          .sandbox__flex
            z-logo
            z-logo(slanted)

          .sandbox__flex
            z-logo(outline)
            z-logo(outline slanted)


          .sandbox__flex.mt-1
            .primary.pa-3.br-1.mb-1
              z-logo(color="white")
              z-logo.mt-2(slanted color="white")

            .primary.pa-3.br-1
              z-logo(outline color="white")
              z-logo.mt-2(outline slanted color="white")

          .sandbox__flex.mt-2
            template(v-for="i in [1, 2, 3, 4]")
              z-logo(:width="4 + 4 * i" outline)

        z-divider
        .sandbox__section
          h3 ZLabel
          z-label Label

      //- Stateful components
      //----------------------------------------------------------------------------------------------------
      .sandbox__content
        h4 Stateful components

        z-divider
        .sandbox__section
          h3 ZOverlay
          z-button.mt-2(@click="showOverlay = true" outline) toggle
          z-overlay(v-model="showOverlay" close-on-click)

        z-divider
        .sandbox__section
          h3 ZInput
          z-input(label="Input label" v-model="inputValue")
          z-input(label="With placeholder" placeholder="Placeholder" caption="and caption")
          z-input(label="Disabled" placeholder="Placeholder" disabled)
          z-layout(align="end" gutter)
            z-col(xxs12 sm6 md3)
              z-input(label="Colored", color="success")
            z-col(xxs12 sm6 md3)
              z-input(color="primary")
            z-col(xxs12 sm6 md3)
              z-input(color="warning")
            z-col(xxs12 sm6 md3)
              z-input(color="danger")
          z-layout(align="end" gutter)
            z-col(xxs12 sm6 md3)
              z-input(label="Read Only" value="You cannot change me" readonly)
            z-col(xxs12 sm6 md3)
              z-input(label="Copyable" value="COPY ME" copyable readonly)
          z-layout(align="end" gutter)
            z-col(xxs12 sm6 md3)
              z-form(@submit.prevent="() => {}")
                z-input(
                  label="With submit button"
                  placeholder="Input with submit button"
                  type="email"
                  submit-button
                  required
                  message="Hello message"
                )
            z-col(xxs12 sm6 md3)
              z-input(
                placeholder="Loading"
                type="email"
                submit-button
                loading
                required
              )
            z-col(xxs12 sm6 md3)
              z-input(
                placeholder="Error"
                type="email"
                submit-button
                error
                required
                message="Error message"
              )
            z-col(xxs12 sm6 md3)
              z-input(
                placeholder="Success"
                type="email"
                submit-button
                success
                required
                message="Success message"
              )
          z-layout.mt-3(align="end" gutter)
            z-col(xxs12 sm6 md3)
              z-input(
                label="With prefix and suffix"
                placeholder="domain"
                submit-button
                prefix="prefix."
                suffix=".suffix"
              )
            z-col(xxs12 sm6 md3)
              z-input(
                label="Hatched style"
                placeholder="domain"
                submit-button
                prefix="prefix."
                suffix=".suffix"
                hatched
              )

        z-divider
        .sandbox__section
          h3 ZCheckbox
          .sandbox__flex
            z-checkbox(label="Label" v-model="checkboxValue")
          .sandbox__flex
            z-checkbox(label="Already checked" :value="true")
          .sandbox__flex
            z-checkbox(label="Indeterminate" :indeterminate.sync="checkboxIndeterminate1")
          .sandbox__flex
            z-checkbox(label="Disabled" disabled)
          .sandbox__flex
            z-checkbox(label="Disabled and checked" disabled :value="true")
          .sandbox__flex
            z-checkbox(label="Disabled and indeterminate" :indeterminate="checkboxIndeterminate2" disabled)
          h6 Colors
          .sandbox__flex
            template(v-for="name in colorList")
              z-checkbox.mr-2(:label="name" :color="name" :value="true")

        z-divider
        .sandbox__section
          h3 ZRadio
          .sandbox__flex
            z-radio(label="Label" v-model="radios1" :input-value="1" name="radios1")
            z-radio(label="Already checked" v-model="radios1" :input-value="2" name="radios1")
          .sandbox__flex
            z-radio(label="Disabled" v-model="radios2" :input-value="1" disabled name="radios2")
            z-radio(label="Disabled and checked" v-model="radios2" :input-value="2" disabled name="radios2")
          h6 Colors
          .sandbox__flex
            template(v-for="name in colorList")
              z-radio.mr-2(:label="name" :color="name" :input-value="name" v-model="radios3" name="radios3")

        z-divider
        .sandbox__section
          h3 ZMenu
          .sandbox__flex
            z-menu(hover)
              template(v-slot:activator="{ focus, blur }")
                z-button(outline @focus="focus" @blur="blur") hover
              p Menu
            z-menu(right)
              template(v-slot:activator="{ activate }")
                z-button(outline @click="activate") toggle
              p Menu
            z-menu(top right)
              template(v-slot:activator="{ activate }")
                z-button(outline @click="activate") toggle
              p Menu
            z-menu(top)
              template(v-slot:activator="{ activate, focus, blur }")
                z-button(outline @click="activate" @focus="focus" @blur="blur" prevent-blur-on-click) forward focus
              p Menu

        z-divider
        .sandbox__section
          h3 ZDialog
          .sandbox__flex
            z-dialog
              template(v-slot:activator="{ activate }")
                z-button(outline @click="activate") toggle
              p Dialog content

        z-divider
        .sandbox__section
          h3 ZExpandable
          z-expandable(toggle-text="Expand me")
            p Cupidatat ipsum cillum mollit esse adipisicing ea eiusmod reprehenderit velit exercitation. Labore velit amet exercitation anim ad sit nulla laborum mollit mollit laborum. Nulla Lorem ex amet Lorem et. Eiusmod eu proident nulla non. Magna ad anim dolore labore minim quis voluptate. Est eiusmod commodo aliqua irure esse.

          z-expandable(toggle-text="Variant" variant)
            p Cillum et ut culpa cupidatat ut laboris culpa cupidatat excepteur consequat anim. Ad nostrud nulla incididunt id sint exercitation do nulla voluptate deserunt do. Consectetur enim eu ex velit. Est nulla non dolor voluptate esse deserunt irure anim.

          z-expandable(toggle-text="Already expanded" :value="true")
            p Proident ad quis excepteur minim commodo magna sit. Consectetur magna proident cupidatat eiusmod consectetur ullamco occaecat sint velit aliquip. Ipsum ut amet exercitation tempor sit. Officia pariatur cupidatat tempor sunt. Labore minim Lorem deserunt eiusmod commodo anim deserunt pariatur consectetur. Ipsum magna esse esse nulla in ex proident sint laboris aliquip dolor. Cupidatat cillum ipsum ipsum laboris dolor commodo nulla irure ipsum.

          z-expandable
            template(v-slot:activator="{ toggle }")
              z-button.my-1(outline @click="toggle")
                span Slot toggle
                z-icon hamburger
            p Aute aliqua ullamco magna anim. Eu eiusmod nisi ea nulla quis Lorem laborum et dolore eiusmod consequat. Do nulla est incididunt proident labore culpa pariatur proident eiusmod.


        //- TODO: complete this
        z-divider
        .sandbox__section
          h3 ZTooltip
          .sandbox__flex
            z-tooltip(valign="top" halign="right")
              template(v-slot:activator)
                z-button(icon)
                  z-icon copy
              span Tooltip
            z-tooltip(valign="bottom" halign="right" :min-width="60")
              template(v-slot:activator)
                z-button(icon)
                  z-icon copy
              span Very Long text yo. Duis nostrud enim nisi minim adipisicing sunt ut ipsum amet. Magna proident non magna tempor magna laborum proident laborum sint deserunt. Exercitation nostrud id dolor ea dolor Lorem eu esse sit anim minim magna eu aliquip. Id tempor tempor aliqua consequat tempor consectetur laboris. Et aute minim anim laborum cupidatat nulla dolore eiusmod exercitation aute nisi sint tempor. Aliquip anim exercitation incididunt sunt pariatur.
            z-tooltip(valign="top" halign="left")
              template(v-slot:activator)
                z-button(icon)
                  z-icon copy
              span Tooltip
            z-tooltip(valign="top" halign="center")
              template(v-slot:activator)
                z-button(icon)
                  z-icon copy
              span Tooltip
            z-tooltip(valign="bottom" halign="center")
              template(v-slot:activator)
                z-button(icon)
                  z-icon copy
              span Tooltip
            z-tooltip(valign="bottom" halign="left")
              template(v-slot:activator)
                z-button(icon)
                  z-icon copy
              span Tooltip
            z-tooltip(valign="bottom" halign="left" no-hover)
              template(v-slot:activator="{ activate }")
                z-button(@click="activate")
                  span activate on click
              span Tooltip

      //- Layout & structural components
      //----------------------------------------------------------------------------------------------------
      .sandbox__content
        h4 Layout & structural components

        z-divider
        .sandbox__section.sandbox__component--layout
          h3 ZCard
          .sandbox__flex
            z-card
              h4 This is a card
              p Hello world

        z-divider
        .sandbox__section.sandbox__component--layout
          h3 ZLayout
          h3 ZCol
          p ZCol works inside ZLayout component.
          .sandbox__flex
            z-layout
              template(v-for="name in [...colorList, 'primary--dark-1', 'success--dark-1', 'info--dark-1']")
                z-col(lg1 md2 sm3 xs4 xxs6 :class="name")
              template(v-for="name in colorList.slice(0, 6)")
                z-col(xl1 lg2 md3 sm4 xs6 xxs12 :class="name")

          p.mt-2 With gutter
          .sandbox__flex
            z-layout(gutter)
              template(v-for="name in colorList.slice(0, 6)")
                z-col(lg2 md3 sm4 xs6 xxs12 :class="name")

          p.mt-2 Justification
          .sandbox__flex
            template(v-for="name in ['start', 'center', 'end']")
              z-layout(:justify="name")
                z-col(lg1 md2 sm3 xs4 xxs6 class="neutral")

          p.mt-2 Alignments
          .sandbox__flex
            template(v-for="name in ['start', 'center', 'end']")
              z-layout.mt-1(:align="name")
                z-col(xxs6 class="neutral" style="height: 48px")
                z-col(xxs6 class="primary" style="height: 24px")

          p.mt-2 Reverse order
          .sandbox__flex
            z-layout(reverse)
              template(v-for="name in colorList")
                z-col(lg1 md2 sm3 xs4 xxs6 :class="name")

        z-divider
        .sandbox__section.sandbox__component--layout
          h3 ZDrawer
          .sandbox__flex
            z-button(@click="appDrawerOpen = !appDrawerOpen") app drawer
          .sandbox__flex
            z-button(@click="rightDrawerOpen = !rightDrawerOpen") right drawer
          z-drawer(v-model="appDrawerOpen" app controls small-controls)
          z-drawer(v-model="rightDrawerOpen" right)

</template>

<style lang="stylus">
@import '../styles/index.styl'

.sandbox
  padding 16px
  background-color #eee

  &__title
    text-align center
    padding size(4)

  &__content
    margin-top size(2)
    background-color #fff
    padding size(4)
    border-radius size(1)

  &__section
    margin size(2) 0

  &__flex
    display flex
    flex-wrap wrap
    align-items center
    margin size(1) 0

    > *
      margin size(0.5) size(1) size(0.5) 0

  &__icon
    display flex
    align-items center
    width 200px
    margin size(1)
    small
      margin-left size(1)

  &__component
    &--layout
      .z-col
        height size(2)
</style>

<script>
import iconList from './utils/icon-list';
import colorList from './utils/color-list';
import { version } from '../../package.json';

export default {
  data() {
    return {
      version,
      elevations: ['inset', 0, 1, 2, 3, 4, 5, 6],
      iconList,
      colorList,
      buttonSizes: [
        { giant: true },
        { large: true },
        {},
        { small: true },
        { tiny: true },
      ],
      showOverlay: false,
      inputValue: 'With initial value',
      checkboxValue: false,
      checkboxIndeterminate1: true,
      checkboxIndeterminate2: true,
      radios1: 2,
      radios2: 2,
      radios3: 'neutral',
      appDrawerOpen: false,
      rightDrawerOpen: false,
    };
  },
  watch: {
    // checkboxValue() {
    //   console.log(this.checkboxValue);
    // },
    // radios1() {
    //   console.log(this.radios1);
    // },
  },
};
</script>
