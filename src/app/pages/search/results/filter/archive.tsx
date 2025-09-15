// <Form
//   onSubmit={(event) => {
//     event.preventDefault()
//     event.stopPropagation()
//     const data = new FormData(event.currentTarget)
//     const entries = data.entries().toArray()
//     const params = new URLSearchParams(entries as [string, string][])
//     console.log(params.toString())
//     event.currentTarget.reset()
//   }}
//   className="px-6 flex flex-col gap-6"
// >
//   <Header.Root>
//     <Header.Content>
//       <Header.Title>Filters</Header.Title>
//       <Header.Subtitle>
//         <span className="font-semibold">{0}</span>
//         <span> filters selected </span>
//       </Header.Subtitle>
//     </Header.Content>
//     <Header.Controls>
//       <ButtonApply type="submit" />
//       {/* <ButtonReset type="reset" /> */}
//       <button type="reset">Reset</button>
//     </Header.Controls>
//   </Header.Root>
//
//   <div />
//
//   <Field.Root name="tags">
//     <Fieldset.Root className="flex flex-col gap-4">
//       <Fieldset.Legend>
//         <div className="font-sora text-sm font-medium text-neutral-600">
//           Tags
//         </div>
//       </Fieldset.Legend>
//
//       <CheckboxGroup className="flex flex-row flex-wrap gap-2">
//         <Field.Label>
//           <Checkbox.Root
//             value="Boujee"
//             className="
//             border-1 border-neutral-100 bg-neutral-50 px-3 py-2 rounded-xl font-sora text-xs text-neutral-400
//             data-checked:bg-primary/5 data-checked:border-primary data-checked:text-primary data-checked:font-semibold
//           "
//           >
//             Boojue
//           </Checkbox.Root>
//         </Field.Label>
//
//         <Field.Label>
//           <Checkbox.Root
//             value="Family Fun"
//             className="
//             border-1 border-neutral-100 bg-neutral-50 px-3 py-2 rounded-xl font-sora text-xs text-neutral-400
//             data-checked:bg-primary/5 data-checked:border-primary data-checked:text-primary data-checked:font-semibold
//           "
//           >
//             Family Fun
//           </Checkbox.Root>
//         </Field.Label>
//       </CheckboxGroup>
//     </Fieldset.Root>
//   </Field.Root>
// </Form>
//
